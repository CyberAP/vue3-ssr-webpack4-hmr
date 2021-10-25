const path = require("path");
const webpack = require("webpack");
const serverConfig = require("../webpack/webpack.config.ssr.dev.js");
const { transformDevStats } = require("./transform-webpack-stats.js");
const { createHtmlRenderer } = require("./render-html.js");

const createHotReloadingServerRenderer = (config) => {
  const serverCompiler = webpack(config);

  let renderApp = null;
  let setCompilationDone = null;
  let ssrCompilation = new Promise((resolve) => {
    setCompilationDone = resolve;
  });

  serverCompiler.watch({ "info-verbosity": "none" }, (error, stats) => {
    if (error) {
      console.error("Server critical error");
      throw error;
    }

    const jsonStats = stats.toJson();

    if (stats.hasErrors()) {
      console.error("Server errors");
      jsonStats.errors.forEach((err) => console.error(err));
      return;
    }

    const { entrypoints, outputPath } = jsonStats;
    const {
      main: {
        assets: [mainChunkPath],
      },
    } = entrypoints;
    const { render } = require(path.resolve(outputPath, mainChunkPath));
    renderApp = render;
    setCompilationDone();
  });

  return async (stuff) => {
    await ssrCompilation;
    const result = await renderApp(stuff);
    return result;
  };
};

const createDevRenderer = (onUpdate) => {
  const renderApp = createHotReloadingServerRenderer(serverConfig);
  const renderHtml = createHtmlRenderer(onUpdate);

  return async (stuff, { stats, outputFileSystem }) => {
    const { html, meta, state } = await renderApp(stuff);

    const { head, body } = transformDevStats(stats.toJson(), outputFileSystem);

    const queryState = JSON.stringify(state.query);

    const completeHtml = await renderHtml({
      appHtml: html,
      meta,
      head,
      body,
      queryState,
    });
    return completeHtml;
  };
};

module.exports = {
  createDevRenderer,
};
