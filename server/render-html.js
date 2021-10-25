const path = require("path");
const Mustache = require("mustache");
const chokidar = require("chokidar");
const {
  promises: { readFile },
} = require("fs");

const templatePath = path.join(__dirname, "../src/page.html");

let template;

const renderHtml = async (stuff) => {
  if (!template) {
    const buffer = await readFile(templatePath);
    template = buffer.toString();
  }
  return Mustache.render(template, stuff);
};

const createHtmlRenderer = (onTemplateUpdate) => {
  let shouldReload = true;
  let currentTemplate;

  chokidar.watch(templatePath).on("change", () => {
    shouldReload = true;
    onTemplateUpdate();
  });

  const loadTemplate = async () => {
    if (!shouldReload) return;
    const buffer = await readFile(templatePath);
    currentTemplate = buffer.toString();
    shouldReload = false;
  };

  return async (stuff) => {
    await loadTemplate();
    return Mustache.render(currentTemplate, stuff);
  };
};

module.exports = {
  createHtmlRenderer,
  renderHtml,
};
