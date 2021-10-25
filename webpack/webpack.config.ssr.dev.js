const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.config.ssr.js");

const config = {
  mode: "development",
  optimization: {
    minimize: false,
  },
};

module.exports = merge(baseConfig, config);
