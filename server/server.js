const path = require("path");
const express = require("express");

const createServer = async () => {
  const app = express();

  app.use("/example", (req, res) => {
    res.json({ foo: "bar" });
  });

  app.use(express.static(path.resolve(__dirname, "../public")));

  return app;
};

module.exports = {
  createServer,
};
