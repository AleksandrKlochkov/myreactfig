const fs = require('fs');
const fsPath = require('path');
const prettier = require('prettier');
const fetch = require('node-fetch');

async function createComponents(canvas, shared) {
  for (let i = 0; i < canvas.children.length; i++) {
    const child = canvas.children[i];
    if (child.visible !== false) {
      const child = canvas.children[i];
      await createComponent(child, shared);
    }
  }
}

async function createComponent(component, parentShared) {
  const { componentMap, options } = parentShared;
  const name = getComponentName(component.name, options);
  const fileName = getFileName(name);
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

  const path = `src/figma-components/${fileName}/${fileName}.jsx`;

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

  print(`<style jsx>{\`${styles}\n\`}</style>`);

  // Stage 4 (Finish the component)

  print('</>);');
  print('});');

  // Stage 5 (Cache the component)

  componentMap[name] = { instance, name, doc, fileName, localComponentMap };
}

