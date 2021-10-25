const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.config.base.js");

const config = {
  target: "node",
  output: {
    filename: "main.[hash].js",
    path: path.resolve(__dirname, "../", "dist/server"),
    libraryTarget: "commonjs2",
  },
  entry: {
    main: "./src/entry-server.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // we don't need styles on the server, so we just ignore them
        use: "null-loader",
      },
    ],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};

module.exports = merge(baseConfig, config);
