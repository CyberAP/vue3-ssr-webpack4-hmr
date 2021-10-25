const normalizeAssets = (assets) => {
  if (Array.isArray(assets)) return assets;
  if (typeof assets === "object") return Object.values(assets);
  return [assets];
};

const transformDevStats = (stats, outputFileSystem) => {
  const {
    assetsByChunkName: { main },
    outputPath,
    publicPath,
  } = stats;

  const head = `
      <style>
      ${normalizeAssets(main)
        .filter((path) => path.endsWith(".css"))
        .map((path) =>
          outputFileSystem.readFileSync(path.join(outputPath, path))
        )
        .join("\n")}
      </style>
    `;

  const body = normalizeAssets(main)
    .filter((path) => path.endsWith(".js"))
    .map((path) => `<script src="${publicPath}${path}"></script>`)
    .join("\n");

  return { head, body };
};

const transformProdStats = ({ stats, publicPath }) => {
  const {
    assetsByChunkName: { main },
  } = stats;

  const head = normalizeAssets(main)
    .filter((path) => path.endsWith(".css"))
    .map((path) => `<link rel="stylesheet" href="${publicPath}${path}">`)
    .join("\n");

  const body = normalizeAssets(main)
    .filter((path) => path.endsWith(".js"))
    .map((path) => `<script src="${publicPath}${path}"></script>`)
    .join("\n");

  return { head, body };
};

module.exports = {
  transformDevStats,
  transformProdStats,
};
