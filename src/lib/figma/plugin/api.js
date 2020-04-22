const fetch = require('node-fetch');

module.exports = {
  getFigmaFiles,
  getFigmaFilesNodes,
  getFigmaCanvas,
  getFigmaVectorListImages,
  getFigmaVectors,
  getFigmaNodes,
  getFigmaRefImages,
  getFigmaListImages,
  getFigmaNodeImages,
  getHeaders
};

const baseUrl = 'https://api.figma.com';

///'https://api.figma.com/v1/files/file_key/nodes?ids=ids&depth=depth(opt)&geometry=geometry(opt)&version=version(opt)&plugin_data=plugin_data(opt)'

// `${baseUrl}/v1/files/${fileKey}/nodes?ids=ids&depth=depth(opt)&geometry=geometry(opt)&version=version(opt)&plugin_data=plugin_data(opt)`

//  const url = `https://api.figma.com/v1/files/${fileKey}?version=${version}&ids=${ids}&depth=${depth}&geometry=geometry=${geometry}&plugin_data=${pluginData}`

function getHeaders(devToken) {
  const headers = new fetch.Headers();
  headers.append('X-Figma-Token', devToken);
  return headers;
}

//GET FILE
async function getFigmaFiles(fileKey, headers, ids='', depth='', geometry='', version='', pluginData='') {
    const data = await httpRequest(`${baseUrl}/v1/files/${fileKey}`, headers); 
    return data
}

//GET file nodes
async function getFigmaFilesNodes(fileKey, headers, ids='', depth='', geometry='', version='', pluginData='') {
  const data = await httpRequest(`${baseUrl}/v1/files/${fileKey}/nodes?ids=${ids}&depth=${depth}&geometry=${geometry}&version=${version}&plugin_data=${pluginData}`, headers);
  return data
}

async function getFigmaCanvas(fileKey, headers) {
  const data = await httpRequest(`${baseUrl}/v1/files/${fileKey}?geometry=paths`, headers);
  const canvas =  data.document.children[0];
  return canvas;
}

async function getFigmaNodes(ids, fileKey, headers) {
  if (ids.length > 0) {
    const data = await httpRequest(`${baseUrl}/v1/files/${fileKey}/nodes?geometry=paths&ids=${ids.join(',')}`, headers);
    
    return data.nodes;
  } else {
    return {};
  }
}

async function getFigmaNodeImages({ imageMap, fileKey, headers, options }) {
  const { imageScale, imageFormat } = options;
  if (Object.keys(imageMap).length > 0) {
    const guids = Object.keys(imageMap).join(',');
    const data = await httpRequest(`${baseUrl}/v1/images/${fileKey}?ids=${guids}&use_absolute_bounds=true&format=${imageFormat}&scale=${imageScale}`, headers);
    return data.images || {};
  } else {
    return {};
  }
}

async function getFigmaRefImages({ fileKey, headers }) {
  const data = await httpRequest(`${baseUrl}/v1/files/${fileKey}/images`, headers);
  return data.meta.images || {};
}

async function getFigmaListImages({ fileKey, headers, options }, guids, format = 'svg', absolute = false, scale = null) {

  if (guids.length > 0) {
    const { imageScale } = options;
    scale = scale || imageScale;

    const data = await httpRequest(
      `${baseUrl}/v1/images/${fileKey}?ids=${guids}&scale=${format === 'svg' ? 1 : imageScale}&format=${format}${
        absolute ? '&use_absolute_bounds=true' : ''
      }`, headers);
    return data.images || {};
  } else {
    return {};
  }
}

async function getFigmaVectorListImages(shared, format = 'svg', absolute = false) {
  const { vectorMap } = shared;
  return getFigmaListImages(shared, Object.keys(vectorMap).join(','), format, absolute);
}

async function getFigmaVectors(shared) {
  const { headers } = shared;
  const vectors = await getFigmaVectorListImages(shared, 'svg', true);
 
  const vectorsRelative = await getFigmaVectorListImages(shared, 'svg', false);
  let promises = [];
  const guids = [];

  for (const guid in vectors) {
    if (vectors[guid] == null) vectors[guid] = vectorsRelative[guid];
    if (vectors[guid] == null) continue;
    guids.push(guid);
    promises.push(fetch(vectors[guid], { headers }));
  }

  let responses = await Promise.all(promises);
  promises = [];
  for (const resp of responses) {
    promises.push(resp.text());
  }

  responses = await Promise.all(promises);
  for (let i = 0; i < responses.length; i++) {
    vectors[guids[i]] = responses[i].replace('<svg ', '<svg preserveAspectRatio="none" ');
  }
  return vectors;
}

async function httpRequest(url, headers = {}, method = 'GET', body = null){
  try {
    if (body) {
       headers['Accept'] = 'application/json'
    }

    const response = await fetch(url, {method, body, headers})

    const data = await response.json()
    if (!response.ok) {
     throw new Error(data.err)
    }

    return data

  } catch(error) {
    throw error
  }
}
