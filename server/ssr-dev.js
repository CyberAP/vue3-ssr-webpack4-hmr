const { createServer } = require("./server.js");
const webpack = require("webpack");
const clientConfig = require("../webpack/webpack.config.client.dev.js");
const devMiddleware = require("webpack-dev-middleware");
const hotMiddleware = require("webpack-hot-middleware");
const { createDevRenderer } = require("./dev-renderer.js");

const setupDevSsr = async () => {
  const app = await createServer();
  const clientCompiler = webpack(clientConfig);
  const { publicPath } = clientConfig.output;

  app.use(
    devMiddleware(clientCompiler, { publicPath, serverSideRender: true })
  );

  const hotMiddlewareInstance = hotMiddleware(clientCompiler, {
    heartbeat: 5000,
  });

  app.use(hotMiddlewareInstance);

  const render = createDevRenderer(() => {
    hotMiddlewareInstance.publish({ reload: true });
  });

  app.use("/*", async (req, res) => {
    const html = await render(
      { url: req.originalUrl },
      res.locals.webpack.devMiddleware
    );
    res.header("Content-Type", "text/html; charset=utf-8").send(html);
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
