const webpack = require("webpack");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.config.client.js");

const config = {
  mode: "development",
  entry: {
    main: ["./src/hot-reload.js", "./src/entry-client.js"],
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};

module.exports = merge(baseConfig, config);
