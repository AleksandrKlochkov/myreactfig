require('dotenv').config();
const presets = require('./presets');

const { preprocessCanvasComponents, createComponents, generateComponent } = require('./lib');
const { getHeaders,getFigmaCanvas, getFigmaNodes, getFigmaVectors, getFigmaRefImages, getFigmaNodeImages} = require('./api');

module.exports = {
  runFigmaReact,
  ...require('./lib'),
  ...require('./api'),
  ...require('./content.plugins'),
  ...require('./style.plugins')
};

async function runFigmaReact(options = {}) {
  console.log(options)
  let fileKey = options.figmaFilesId;
  let devToken = options.figmaApiKey;
  let presetName = 'mobx';
  options.fileKey = options.figmaFilesId;
  options.devToken = options.figmaApiKey;

  if (!fileKey || !devToken) {
    console.log('Invalid token or file key');
    process.exit(0);
  }

  Object.assign(options, presets[presetName]);

  options.dir = options.dir || process.env.FIGMA_DIR;
  options.makeDir = options.makeDir == null ? !!process.env.FIGMA_MAKE_DIR : options.makeDir;

  console.log(options);
  const headers = getHeaders(devToken);
  // Create shared objects
  const vectorMap = {
    // 'I91:120;1:82': ''
  };
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


