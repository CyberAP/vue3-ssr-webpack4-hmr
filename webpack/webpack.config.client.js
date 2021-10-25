const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.config.base.js");

const config = {
  output: {
    filename: "main.[hash].js",
    path: path.resolve(__dirname, "../", "dist/client"),
    publicPath: "/assets/",
  },
};

module.exports = merge(baseConfig, config);
