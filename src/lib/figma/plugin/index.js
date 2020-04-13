require('dotenv').config();
const presets = require('./presets');

const { preprocessCanvasComponents, createComponents, generateComponent } = require('./lib');
const { getFigmaCanvas, getFigmaNodes, getFigmaVectors, getFigmaRefImages, getFigmaNodeImages} = require('./api');
// const { getFigmaCanvas, getFigmaNodes, getFigmaVectors, getFigmaRefImages, getFigmaNodeImages} = require('./generate');

module.exports = {
  runFigmaReact,
  ...require('./lib'),
  ...require('./api'),
  ...require('./content.plugins'),
  ...require('./style.plugins'),
  ...require('./generate')
};

async function runFigmaReact(options = {}) {
  let fileKey = options.fileKey || process.env.FIGMA_FILE_KEY;
  let devToken = options.figmaApiKey || process.env.FIGMA_DEV_TOKEN;
  let presetName = 'mobx' || process.env.FIGMA_PRESET;

  if (!fileKey || !devToken) {
    console.log('Invalid token or file key');
    process.exit(0);
  }

  Object.assign(options, presets[presetName]);

  options.dir = options.dir || process.env.FIGMA_DIR;
  options.makeDir = options.makeDir == null ? !!process.env.FIGMA_MAKE_DIR : options.makeDir;

  const headers = options.headers
  // Create shared objects
  const vectorMap = {};
  const imageMap = {};
  const componentMap = {};
  const componentDescriptionMap = {};

  const shared = {
    componentMap,
    componentDescriptionMap,
    vectorMap,
    imageMap,
    options,
    fileKey,
    headers
  };

  // Load the document from Figma
  const canvas = await getFigmaCanvas(fileKey, headers);

  // Wrap vectors and images
  preprocessCanvasComponents(canvas, shared);

  // Load component description
  const nodes = await getFigmaNodes(Object.keys(componentDescriptionMap), fileKey, headers);

  for (const id in nodes) {
    componentDescriptionMap[id] = nodes[id].components[id].description;
  }

  // Load all images used in the document from Figma
  shared.vectors = await getFigmaVectors(shared);
  shared.refImages = await getFigmaRefImages(shared);
  shared.images = await getFigmaNodeImages(shared);

  // Create components
  await createComponents(canvas, shared);

  // Generate components
  for (const key in componentMap) {
    await generateComponent(componentMap[key], options);
  }
}


