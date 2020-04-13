const fetch = require('node-fetch');

//GET FILES URL
//'https://api.figma.com/v1/files/file_key ?version=version (optional)&ids=ids (optional)&depth=depth (optional)&geometry=geometry (optional)&plugin_data=plugin_data (optional)'
//GET FILE NODES URL
//'https://api.figma.com/v1/files/figma_key/nodes?ids=ids&depth=depth (optional)&geometry=geometry (optional)&version=version (optional)&plugin_data=plugin_data (optional)'
//GET IMAGES URL
//'https://api.figma.com/v1/images/file_key?ids=ids&scale=scale (optional)&format=format (optional)&use_absolute_bounds=use_absolute_bounds (optional)&version=version (optional)'
//GET IMAGES URL
//https://api.figma.com/v1/files/:file_key/images

module.exports = {
  getHeaders,
  getFigmaFiles,
  getFigmaFileNodes,
  getFigmaFileImages,
  getFigmaFileImagesFills
};

const baseUrl = 'https://api.figma.com';

function getHeaders(devToken) {
  const headers = new fetch.Headers();
  headers.append('X-Figma-Token', devToken);
  return headers;
}

//GET FILES
async function getFigmaFiles(options) {
  const {figmaKey, headers, ids, depth, geometry, version, plugin_data} = options;
  const urlParams = [];
  if(version) urlParams.push(`&version=${version}`);
  if(ids) urlParams.push(`&ids=${ids}`);
  if(depth) urlParams.push(`&depth=${depth}`);
  if(geometry) urlParams.push(`&geometry=${geometry}`);
  if(plugin_data) urlParams.push(`&plugin_data=${plugin_data}`);
  let params = urlParams.join('');
  if(version || ids || depth || geometry || plugin_data) {
    urlParams.unshift('/');
    params = urlParams.join('');
    console.log(params);
    params = params.replace(/\/&/g,'/');
  }

  // console.log(`${baseUrl}/v1/files/${figmaKey}${params}`);
  const data = await httpRequest(`${baseUrl}/v1/files/${figmaKey}${urlParams.join('')}`, headers); 
  return data;
}

//GET FILE NODES
async function getFigmaFileNodes(options) {
  const {figmaKey, headers, ids, depth, geometry, version, plugin_data} = options;
  const urlParams = [];
  if(depth) urlParams.push(`&depth=${depth}`);
  if(geometry) urlParams.push(`&geometry=${geometry}`);
  if(version) urlParams.push(`&version=${version}`);
  if(plugin_data) urlParams.push(`&plugin_data=${plugin_data}`);
  // console.log('URL', `${baseUrl}/v1/files/${figmaKey}/nodes?ids=${ids}${urlParams.join('')}`)
  const data = await httpRequest(`${baseUrl}/v1/files/${figmaKey}/nodes?ids=${ids}${urlParams.join('')}`, headers); 
  return data;
}

//GET FILE IMAGES
async function getFigmaFileImages(options) {

  const {figmaKey, headers, ids, scale, format, svg_include_id, svg_simplify_stroke, use_absolute_bounds, version} = options;
  const urlParams = [];
  if(scale) urlParams.push(`&scale=${scale}`);
  if(format) urlParams.push(`&format=${format}`);
  if(svg_include_id) urlParams.push(`&svg_include_id=${svg_include_id}`);
  if(svg_simplify_stroke) urlParams.push(`&svg_simplify_stroke=${svg_simplify_stroke}`);
  if(use_absolute_bounds) urlParams.push(`&use_absolute_bounds=${use_absolute_bounds}`);
  if(version) urlParams.push(`&version=${version}`);
  // console.log('URL', `${baseUrl}/v1/images/${figmaKey}?ids=${ids}${urlParams.join('')}`)
  const data = await httpRequest(`${baseUrl}/v1/files/${figmaKey}/nodes?ids=${ids}${urlParams.join('')}`, headers); 
  return data;
}

//GET FILE IMAGES FILLS
async function getFigmaFileImagesFills(options) {
  const {figmaKey, headers} = options;

  // console.log('URL', `${baseUrl}/v1/images/${figmaKey}?ids=${ids}${urlParams.join('')}`)
  const data = await httpRequest(`${baseUrl}/v1/files/${figmaKey}/images`, headers); 
  return data;
}

async function httpRequest(url, headers = {}, method = 'GET', body = null){
  try {
    if (body) {
       headers['Accept'] = 'application/json'
    }
    console.log(url)
    const response = await fetch(url, {method, body, headers})

    const data = await response.json();
    if (!response.ok) {
     throw new Error(data.err)
    }

    return data

  } catch(error) {
    console.log(error);
    throw error
  }
}
