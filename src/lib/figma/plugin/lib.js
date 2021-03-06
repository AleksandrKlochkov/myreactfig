const fs = require('fs');
const fsPath = require('path');
const prettier = require('prettier');
const fetch = require('node-fetch');
const chalk = require('chalk');

const VECTOR_TYPES = ['VECTOR', 'LINE', 'REGULAR_POLYGON', 'ELLIPSE', 'STAR'];
const GROUP_TYPES = ['GROUP', 'BOOLEAN_OPERATION'];

const defaultStyles = `
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

module.exports = {
  VECTOR_TYPES,
  GROUP_TYPES,
  colorString,
  dropShadow,
  innerShadow,
  imageURL,
  nodeSort,
  getPaint,
  paintToLinearGradient,
  paintToRadialGradient,
  expandChildren,
  generateComponentFile,
  applyFontStyle,
  camelToSnake,
  getFileName,
  convertStyles,
  getComponentName,
  getComponentInstance,
  getElementParams,
  defaultStyles,
  createNodeBounds,
  printDiv,
  emptyChildren,
  renderChildren,
  visitNode,
  paintsRequireRender,
  preprocessTree,
  preprocessCanvasComponents,
  writeFile,
  typeFactoryDefault,
  createComponent,
  createComponents,
  generateComponent,
  getDescriptionStyles,
  makeDir,
  saveFileFromFetch,
  loadImageToDisk,
  loadImageFromImagesToDisk,
  loadImageFromRefImagesToDisk,
  saveSvgToDisk
};

function typeFactoryDefault({ props }) {
  return `{ ${Object.keys(props)
    .map(key => `${key}: ${props[key] || 'any'};\n`)
    .join('')} }`;
}

function colorString(color, opacity) {
  return `rgba(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}, ${
    opacity == null ? color.a : opacity
  })`;
}

function dropShadow(effect) {
  return `${effect.offset.x}px ${effect.offset.y}px ${effect.radius}px ${colorString(effect.color)}`;
}

function innerShadow(effect) {
  return `inset ${effect.offset.x}px ${effect.offset.y}px ${effect.radius}px ${colorString(effect.color)}`;
}

function imageURL(hash) {
  const squash = hash.split('-').join('');
  return `url(https://s3-us-west-2.amazonaws.com/figma-alpha/img/${squash.substring(0, 4)}/${squash.substring(4, 8)}/${squash.substring(
    8
  )})`;
}

function nodeSort(a, b) {
  if (a.absoluteBoundingBox.y < b.absoluteBoundingBox.y) return -1;
  else if (a.absoluteBoundingBox.y === b.absoluteBoundingBox.y) return 0;
  else return 1;
}

function getPaint(paintList) {
  if (paintList && paintList.length > 0) {
    return paintList[paintList.length - 1];
  }

  return null;
}

function paintToLinearGradient(paint) {
  const handles = paint.gradientHandlePositions;
  const handle0 = handles[0];
  const handle1 = handles[1];

  const yDiff = handle1.y - handle0.y;
  const xDiff = handle0.x - handle1.x;

  const angle = Math.atan2(-xDiff, -yDiff);
  const stops = paint.gradientStops
    .map(stop => {
      return `${colorString(stop.color)} ${Math.round(stop.position * 100)}%`;
    })
    .join(', ');
  return `linear-gradient(${angle}rad, ${stops})`;
}

function paintToRadialGradient(paint) {
  const stops = paint.gradientStops
    .map(stop => {
      return `${colorString(stop.color)} ${Math.round(stop.position * 60)}%`;
    })
    .join(', ');

  return `radial-gradient(${stops})`;
}

function expandChildren(node, parent, minChildren, maxChildren, centerChildren, offset) {
  const children = node.children;
  let added = offset;

  if (children) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i];

      // WTF?!?!
      // if (parent != null && (node.type === 'COMPONENT' || node.type === 'INSTANCE')) {
      //   child.constraints = { vertical: 'TOP_BOTTOM', horizontal: 'LEFT_RIGHT' };
      // }

      if (GROUP_TYPES.indexOf(child.type) >= 0) {
        added += expandChildren(child, parent, minChildren, maxChildren, centerChildren, added + i);
        continue;
      }

      child.order = i + added;

      if (child.constraints && child.constraints.vertical === 'BOTTOM') {
        maxChildren.push(child);
      } else if (child.constraints && child.constraints.vertical === 'TOP') {
        minChildren.push(child);
      } else {
        centerChildren.push(child);
      }
    }

    minChildren.sort(nodeSort);
    maxChildren.sort(nodeSort);

    return added + children.length - offset;
  }

  return added - offset;
}

function applyFontStyle(_styles, fontStyle) {
  if (fontStyle) {
    _styles.fontSize = fontStyle.fontSize;
    _styles.fontWeight = fontStyle.fontWeight;
    if (fontStyle.textCase === 'UPPER') {
      _styles.textTransform = 'uppercase';
    }
    if (fontStyle.textCase === 'LOWER') {
      _styles.textTransform = 'lowercase';
    }
    if (fontStyle.textCase === 'TITLE') {
      _styles.textTransform = 'capitalize';
    }
    _styles.fontFamily = fontStyle.fontFamily;
    _styles.textAlign = fontStyle.textAlignHorizontal;
    _styles.fontStyle = fontStyle.italic ? 'italic' : 'normal';
    _styles.lineHeight = `${fontStyle.lineHeightPercentFontSize}%`;
    _styles.letterSpacing = `${fontStyle.letterSpacing}px`;
  }
}

function camelToSnake(str) {
  let value = str.replace(/([A-Z])/g, group => '-' + group.toLowerCase());
  if (value[0] === '-') return value.substring(1);
  return value;
}

function getFileName(str) {
  const name = camelToSnake(str.replace(/\W+/g, ''));
  return name;
}

function convertStyles(styles) {
  return Object.keys(styles)
    .map(key => {
      const name = camelToSnake(key);
      if (
        [
          'width',
          'min-width',
          'max-width',
          'height',
          'min-height',
          'max-height',
          'left',
          'right',
          'top',
          'bottom',
          'font-size',
          'margin-right',
          'margin-left',
          'margin-top',
          'margin-bottom',
          'padding-right',
          'padding-left',
          'padding-top',
          'padding-bottom'
        ].includes(name) &&
        styles[key] != null &&
        String(styles[key]).match(/[^0-9\.\-]/g) == null
      ) {
        styles[key] = `${styles[key]}px`;
      }
      return styles[key] != null && `${name}: ${styles[key]};`;
    })
    .filter(n => !!n)
    .join('\n');
}

function getComponentName(name, options = {}) {
  const dotIndex = name.indexOf(options.delIndex || '??');
  if (dotIndex >= 0) {
    name = name.substring(0, dotIndex);
  }
  return name.replace(/\W+/g, '');
}

function getComponentInstance(component, options = {}) {
  const name = getComponentName(component.name, options);
  return name + options.classAfterFix;
}

function getElementParams(name, options = {}) {
  let params = {};
  const delIndex = name.indexOf(options.delIndex || '??');
  if (delIndex >= 0) {
    const paramsStr = name.substring(delIndex + 2);
    const paramsSplit = paramsStr.split(options.paramsSplitIndex || '&');
    paramsSplit.forEach(paramStr => {
      const [paramKey, paramValue] = paramStr.split(options.paramSplitIndex || '=');
      const dotIndex = paramKey.indexOf(options.objectIndex || '.');
      if (dotIndex >= 0) {
        const [firstKey, secondKey] = paramKey.split(options.objectIndex || '.');
        if (!params[firstKey]) params[firstKey] = {};
        params[firstKey][secondKey] = paramValue;
      } else params[paramKey] = paramValue;
    });
  }

  return params;
}

function getNodeOriginalBounds(node) {
  const nodeBounds = { ...node.absoluteBoundingBox };
  nodeBounds.x = nodeBounds.x + (nodeBounds.width - node.size.x) / 2;
  nodeBounds.y = nodeBounds.y + (nodeBounds.height - node.size.y) / 2;
  nodeBounds.width = node.size.x;
  nodeBounds.height = node.size.y;
  return nodeBounds;
}

function getNodeAngle(node) {
  let angle = 0;
  if (node.relativeTransform) {
    const [[m00, m01, m02], [m10, m11, m12]] = node.relativeTransform;
    angle += Math.atan2(-m10, m00) * (180 / Math.PI);
  }
  return angle;
}

function createNodeBounds(node, parent, notFirst) {
  if (parent != null) {
    const parentBounds = getNodeOriginalBounds(parent);
    const nodeBounds = getNodeOriginalBounds(node);

    const angle = getNodeAngle(node);

    const shouldHaveNegativeMargin = notFirst;
    const topFirst = nodeBounds.y - (parentBounds.y + parentBounds.height);
    const topNotFirst = nodeBounds.y - parentBounds.y;

    return {
      left: nodeBounds.x - parentBounds.x,
      right: parentBounds.x + parentBounds.width - (nodeBounds.x + nodeBounds.width),
      top: shouldHaveNegativeMargin ? topFirst : topNotFirst,
      bottom: parentBounds.y + parentBounds.height - (nodeBounds.y + nodeBounds.height),
      width: nodeBounds.width,
      height: nodeBounds.height,
      angle
    };
  }
  return null;
}

function printDiv({ node, increaseDivCounter, middleStyle, outerStyle, innerStyle, nodeProps, classNames }, { printStyle, print }) {
  if (Object.keys(outerStyle).length > 0 && middleStyle.zIndex != null) {
    outerStyle.zIndex = middleStyle.zIndex;
    outerStyle.pointerEvents = 'none';
  }

  if (Object.keys(innerStyle).length > 0 && middleStyle.zIndex != null) {
    innerStyle.zIndex = middleStyle.zIndex;
    innerStyle.pointerEvents = 'none';
  }

  const middleId = printStyle(middleStyle);
  const outerId = printStyle(outerStyle);
  const innerId = printStyle(innerStyle);

  if (outerId) {
    print(`<div className='${outerId}'>`);
    increaseDivCounter();
  }

  print(`<div`);
  if (!Object.keys(nodeProps).includes('id')) print(`id='${node.id}'`);
  Object.keys(nodeProps).forEach(key => {
    print(`${key}={${nodeProps[key]}}`);
  });
  print(`className='${middleId}${classNames.length ? ' ' : ''}${classNames.join(' ')}'`);
  print(`>`);
  increaseDivCounter();

  if (innerId) {
    print(`<div className='${innerId}'>`);
    increaseDivCounter();
  }
}

function emptyChildren({ content, minChildren, centerChildren, maxChildren }) {
  minChildren.splice(0, minChildren.length);
  centerChildren.splice(0, centerChildren.length);
  maxChildren.splice(0, maxChildren.length);
  content.splice(0, content.length);
}

async function renderChildren({ node, minChildren, centerChildren, maxChildren }, shared) {
  let first = true;

  let prev = null;
  for (const child of minChildren) {
    await visitNode(shared, child, prev, node, !first);
    first = false;
    prev = child;
  }

  for (const child of centerChildren) {
    await visitNode(shared, child, prev, node);
    prev = child;
  }

  first = true;
  for (const child of maxChildren) {
    await visitNode(shared, child, prev, node, !first);
    first = false;
    prev = child;
  }
}

async function visitNode(shared, node, prev = null, parent = null, notFirst = false) {
  const { print, preprint, options } = shared;

  const nodeProps = {};
  const classNames = [];

  const minChildren = [];
  const maxChildren = [];
  const centerChildren = [];
  const content = [];

  let divCounter = 0;
  const increaseDivCounter = () => divCounter++;
  const decreaseDivCounter = () => divCounter--;

  const outerStyle = {};
  const innerStyle = {};
  const middleStyle = {
    position: 'relative',
    boxSizing: 'border-box',
    pointerEvents: 'auto'
  };

  const props = getElementParams(node.name, options);
  const bounds = createNodeBounds(node, parent, notFirst);

  const state = {
    classNames,
    node,
    prev,
    props,
    increaseDivCounter,
    decreaseDivCounter,
    middleStyle,
    outerStyle,
    innerStyle,
    parent,
    bounds,
    minChildren,
    maxChildren,
    centerChildren,
    content,
    nodeProps
  };

  node.state = state;

  expandChildren(node, parent, minChildren, maxChildren, centerChildren, 0);

  let docBuffer = '';

  const preprintBuffer = msg => {
    docBuffer = `${msg}\n` + docBuffer;
  };

  const printBuffer = msg => {
    docBuffer += `${msg}\n`;
  };

  const sharedScoped = {
    ...shared,
    print: printBuffer,
    preprint: preprintBuffer,
    preprintComponent: preprint
  };

  // If it's a parent then set max width & height
  if (parent == null) {
    middleStyle.width = '100%';
    middleStyle.height = '100%';
  }

  // Style Plugins
  for (const plugin of options.stylePlugins) {
    await plugin(state, sharedScoped);
  }

  // Content Plugins
  for (const plugin of options.contentPlugins) {
    await plugin(state, sharedScoped);
  }

  // If it's a parent then remove overflow
  if (parent == null) {
    // delete middleStyle.position;
    outerStyle.position = 'relative';

    if (Object.keys(outerStyle).length > 0) {
      outerStyle.width = '100%';
      outerStyle.height = '100%';
    }
  }

  // Render
  printDiv(state, shared);

  print(docBuffer);

  await renderChildren(state, shared);

  for (const piece of content) {
    print(piece);
  }

  // Render endings
  for (let i = 0; i < divCounter; i++) {
    print(`</div>`);
  }
}

function paintsRequireRender(paints) {
  if (!paints) return false;

  let numPaints = 0;
  for (const paint of paints) {
    if (paint.visible === false) continue;

    numPaints++;
    if (paint.type === 'EMOJI') return true;
  }

  return numPaints > 1;
}

function preprocessTree(node, shared) {
  const { vectorMap, imageMap, options } = shared;

  const props = getElementParams(node.name, options);

  let vectorsOnly = node.type !== 'FRAME';


  const children = node.children && node.children.filter(child => child.visible !== false);

  if (children) {
    for (let j = 0; j < children.length; j++) {
      if (!VECTOR_TYPES.includes(children[j].type)) {
        vectorsOnly = false;
      } else {

      }
    }
  }

  node.children = children;

  if ((children && children.length > 0 && vectorsOnly) || Object.keys(props).includes('vector')) {
    node.type = 'VECTOR';
  }

  if (VECTOR_TYPES.includes(node.type)) {
    node.type = 'VECTOR';
    vectorMap[node.id] = node;
    node.children = [];
  }

  if (node.fills.find(f => f.type === 'IMAGE')) {
    imageMap[node.id] = node;
  }

  if (node.children) {
    for (const child of node.children) {
      preprocessTree(child, shared);
    }
  }
}

function preprocessCanvasComponents(canvas, shared) {
  for (let i = 0; i < canvas.children.length; i++) {
    const child = canvas.children[i];
    if (child.name.charAt(0) === '#' && child.visible !== false) {
      const child = canvas.children[i];
      preprocessTree(child, shared);
    }
    if (child.type === 'FRAME' && child.visible !== false) {
      const child = canvas.children[i];
      preprocessTree(child, shared);
    }
    if (child.type === 'COMPONENT') {
      shared.componentDescriptionMap[child.id] = '';
    }
  }
}

function makeDir(dir) {
  if (dir) {
    fs.mkdirSync(fsPath.resolve(dir), { recursive: true });
  }
}

function writeFile(path, contents, options = {}) {
  if (options.makeDir) {
    makeDir(options.dir);
  }
  new Promise((r, e) =>
    prettier.resolveConfig('./.prettierrc').then(prettierOptions => {
      try {
        fs.writeFileSync(path, prettier.format(contents, prettierOptions || options.prettierOptions));
        console.log(`wrote ${path}`);
        r();
      } catch (err) {
        console.error(err);
        e(err);
      }
    })
  );
}

function getDescriptionStyles({ componentDescriptionMap, options }, node) {
  const delimiter = options.styleDescriptionDelimiter || '!style!';
  const id = node.componentId || node.id;
  const description = componentDescriptionMap[id] || '';
  return description.substring(description.indexOf(delimiter) + delimiter.length).replace(/\\n/g, `\n`);
}

function firstLatterToUpper(fileName) {
  console.log('FNAME',fileName);
  if(fileName) {
    fileName = fileName.toLowerCase().split('_').map(i=>i[0].toUpperCase() + i.slice(1)).join('').replace(/ /g, '');
  }
  return fileName;
}

async function createComponent(component, parentShared) {
  const { componentMap, options } = parentShared;
  const name = getComponentName(component.name, options);
  const fileName = firstLatterToUpper(name);//getFileName(name)
  const instance = getComponentInstance(component, options);

  const classPrefix = options.classPrefix || 'figma-';
  const localComponentMap = {};

  let doc = '';
  let styleCounter = 0;
  let styles = defaultStyles;

  const props = {};
  const additionalStyles = [];

  const preprint = msg => {
    doc = `${msg}\n` + doc;
  };

  const print = msg => {
    doc += `${msg}\n`;
  };

  const genClassName = () => {
    const value = classPrefix + styleCounter;
    styleCounter++;
    return value;
  };

  const printStyle = style => {
    if (!style) return null;
    const id = genClassName();
    const convertedStyle = convertStyles(style);
    if (convertedStyle) {
      styles += `\n.${id} {\n${convertedStyle}\n}`;
      return id;
    }
    return null;
  };



  const path = `src/figma-components/${fileName}.jsx`;

  const shared = {
    ...parentShared,
    name,
    fileName,
    path,
    instance,
    props,
    component,
    print,
    preprint,
    genClassName,
    printStyle,
    additionalStyles,
    localComponentMap,
    stylePlugins: options.stylePlugins,
    contentPlugins: options.contentPlugins
  };

  print(`return (<>`);

  // Stage 1 (Generate the /Component for importing and code reuse)

  await generateComponentFile(shared, options);

  // Stage 2 (Generate the component from the root)

  await visitNode(shared, component);

  // Render props
  const decorator = options.decorator || 'observer';
  const typeFactory = options.typeFactory || typeFactoryDefault;
  preprint(
    `export const ${instance} = ${decorator}(props => { ${
      Object.keys(props).length ? `const { ${Object.keys(props).join(', ')} } = props;` : ''
    }`
  ); // Can be replaced with React.memo(...)

  // Render additional styles

  additionalStyles.forEach(s => (styles += `\n${s}`));

  // Collect styles from component description

  const descStyle = getDescriptionStyles(shared, component);

  if (descStyle) {
    styles += `\n${descStyle}`;
  }

  // Stage 3 (Collect all styles)
  //STYLES
  //print(`<style jsx>{\`${styles}\n\`}</style>`);

  await createStyleScss(fileName, styles)

  // Stage 4 (Finish the component)

  print('</>);');
  print('});');

  // Stage 5 (Cache the component)

  componentMap[name] = { instance, name, doc, fileName, localComponentMap };
}

async function createStyleScss(fileName, styles){
  const path = `src/figma-components/${fileName}.scss`;

  fs.writeFile(fsPath.resolve(`${path}`), styles,  function(e) { 
  if (e) { //если возникла ошибка записи
    console.error(chalk.red(`\nError failed to overwri  te file ${path}`), e.message);
  } 
    console.log(chalk.green(`\nData from figma received successfully and written to file "${path}"!`));
  });
}

async function createComponents(canvas, shared) {
  for (let i = 0; i < canvas.children.length; i++) {
    const child = canvas.children[i];
    if (child.visible !== false) {
      const child = canvas.children[i];
      await createComponent(child, shared);
    }
  }
}

async function generateComponentFile({ path, instance, fileName, name }, options = {}) {
  if (!fs.existsSync(path)) {
    let componentSrc = '';
    componentSrc += `import * as React from 'react';\n`;

    const imports = options.imports || [`import { observer } from 'mobx-react';`];
    imports.forEach(imp => {
      componentSrc += `${imp}\n`;
    });

    componentSrc += `import { ${instance} } from './${fileName}${options.fileAfterFix}';\n`;
    componentSrc += `\n`;

    const decorator = options.decorator || 'observer';

    componentSrc += `export const ${name} = ${decorator}(props => {\n`;
    componentSrc += `return <${instance} {...props} />;\n`;
    componentSrc += `});\n`;
    await writeFile(path, componentSrc, options);
  }
}

async function generateComponent(component, options) {
  const path = fsPath.resolve(options.dir, `${component.fileName}${options.fileAfterFix}.jsx`);
  

  // Content represents writing cursor
  let contents = '';

  // Header
  contents += `import * as React from 'react';\n`;
  contents += `import './${component.fileName}.scss';\n`;

  const imports = options.imports || [`import { observer } from 'mobx-react';`];
  imports.forEach(imp => {
    contents += `${imp}\n`;
  });

  for (const key in component.localComponentMap) {
    contents += `import { ${component.localComponentMap[key].name} } from './${component.localComponentMap[key].fileName}';\n`;
  }

  contents += `\n`;
  contents += component.doc;

  // Write the final result
  await writeFile(path, contents, options);
}

async function saveFileFromFetch(res, path) {
  await new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(path);
    res.body.pipe(fileStream);
    res.body.on('error', err => {
      reject(err);
    });
    fileStream.on('finish', function() {
      resolve();
    });
  });
}

async function saveSvgToDisk(fileName, content, { options }) {
  fileName += '.svg';

  if (options.makeDir) {
    await makeDir(options.imageDir);
  }

  fs.writeFileSync(fsPath.resolve(options.imageDir, fileName), content);

  return `'${options.imageUrlPrefix}/${fileName}'`;
}

async function loadImageToDisk(url, fileName, { options, headers }) {
  const imageRequest = await fetch(url, { headers });

  if (imageRequest.headers.get('content-type') === 'image/svg+xml') {
    fileName += '.svg';
  }
  if (imageRequest.headers.get('content-type') === 'image/png') {
    fileName += '.png';
  }
  if (imageRequest.headers.get('content-type') === 'image/jpeg') {
    fileName += '.jpg';
  }

  if (options.makeDir) {
    await makeDir(options.imageDir);
  }

  await saveFileFromFetch(imageRequest, fsPath.resolve(options.imageDir, fileName));

  return `'${options.imageUrlPrefix}/${fileName}'`;
}

async function loadImageFromImagesToDisk(node, shared) {
  const { images } = shared;
  const fileName = node.id.replace(/\W+/g, '-');
  return loadImageToDisk(images[node.id], fileName, shared);
}

async function loadImageFromRefImagesToDisk(imageRef, shared) {
  const { refImages } = shared;
  const fileName = imageRef.replace(/\W+/g, '-');
  return loadImageToDisk(refImages[imageRef], fileName, shared);
}
