const path = require("path");
const express = require("express");
const { createServer } = require("./server.js");
const clientStats = require("../dist/client/stats.json");
const clientConfig = require("../webpack/webpack.config.client.prod.js");
const serverConfig = require("../webpack/webpack.config.ssr.prod.js");
const serverManifest = require("../dist/server/manifest.json");
const { renderHtml } = require("./render-html.js");
const { transformProdStats } = require("./transform-webpack-stats.js");

const setupDevSsr = async () => {
  const app = await createServer();

  app.use(
    clientConfig.output.publicPath,
    express.static(path.resolve(__dirname, "../dist/client"))
  );

  const { render } = require(path.join(
    serverConfig.output.path,
    serverManifest["main.js"]
  ));
  const { head, body } = transformProdStats({
    stats: clientStats,
    publicPath: clientConfig.output.publicPath,
  });

  app.use("/*", async (req, res) => {
    const { html, meta, state } = await render({
      url: req.originalUrl,
    });

    const queryState = JSON.stringify(state.query);

    const completeHtml = await renderHtml({
      appHtml: html,
      meta,
      head,
      body,
      queryState,
    });
    res.header("Content-Type", "text/html; charset=utf-8").send(completeHtml);
  });

  return app;
};

const start = async () => {
  const app = await setupDevSsr();
  try {
    await app.listen(3000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
