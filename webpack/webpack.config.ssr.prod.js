const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.config.ssr.js");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const config = {
  mode: "production",
  plugins: [new WebpackManifestPlugin()],
};

module.exports = merge(baseConfig, config);
