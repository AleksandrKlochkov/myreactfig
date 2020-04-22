const PREFIX = 'figma_';
const CLASS_PREFIX = 'Figma';
const BASE_URL = 'https://api.figma.com';
//DIRECTORY
const SHARED_DIR = PREFIX + 'design';
const FILES_DIR = PREFIX + 'files';
const COMPONENTS_DIR = PREFIX + 'components';
const STATIC_DIR = 'static';
const IMAGES_DIR = 'images';
//PATHS
const SHARED_PATH = `./src/${SHARED_DIR}`; //'./src/figma_design'
const FILES_PATH = `${SHARED_PATH}/${FILES_DIR}`; // './src/figma_design/figma_files'
const COMPONENTS_PATH = `${SHARED_PATH}/${COMPONENTS_DIR}`; // './src/figma_design/figma_components'
const IMAGES_PATH = `${SHARED_PATH}/${STATIC_DIR}/${IMAGES_DIR}`; // './src/figma_design/static/images'
//TYPES
const ALL_TYPES = ['DOCUMENT', 'CANVAS', 'FRAME', 'GROUP', 'VECTOR', 'BOOLEAN', 'STAR', 'LINE', 'ELLIPSE', 'REGULAR_POLYGON', 'RECTANGLE', 'TEXT', 'SLICE', 'COMPONENT', 'INSTANCE'];
const ELEMENT_TYPES = ['DOCUMENT', 'CANVAS', 'FRAME','TEXT', 'SLICE', 'COMPONENT', 'INSTANCE', 'BOOLEAN'];
const SHAPE_TYPES = ['DOCUMENT', 'CANVAS', 'FRAME', 'COMPONENT', 'INSTANCE', 'BOOLEAN'];
const VECTOR_TYPES = ['VECTOR', 'LINE', 'REGULAR_POLYGON', 'ELLIPSE', 'STAR'];
const GROUP_TYPES = ['GROUP', 'BOOLEAN_OPERATION'];

//STYLE
const DEFAULT_STULE = `
input {
  font: inherit;
  border: inherit;
  padding: inherit;
  background-color: inherit;
  color: inherit;
}
input:focus {
  outline: none;
}
.vector {
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  position: absolute;
  overflow: visible !important;
}`;

SHARED = {
    document : {},
    components: [],
    images: {},
    vectors: {},
    options: {},
    fileKey: {},
    headers:{}
}

module.exports = {
    PREFIX,
    CLASS_PREFIX,
    BASE_URL,
    SHARED_PATH,
    FILES_PATH,
    COMPONENTS_PATH,
    IMAGES_PATH,
    DEFAULT_STULE,
    SHARED,
    ALL_TYPES,
    ELEMENT_TYPES,
    SHAPE_TYPES,
    VECTOR_TYPES, 
    GROUP_TYPES
}