const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const apiFigma = require('./api');

module.exports.getFigmaFiles = async function ({figmaFilesId, figmaApiKey,mode}) {

    const {getHeaders, getFiles, getFileNodes} = apiFigma; 

    const headers = getHeaders(figmaApiKey);

    const figmaFiles = await getFiles({figmaFilesId, headers});
    const figmaFileNodes = await getFileNodes({figmaFilesId, headers, ids:'140:30'});

    if(figmaFiles) {
        createFigmaDocument('figma_files', figmaFiles, mode);
    }

    if(figmaFileNodes) {
      createFigmaDocument('figma_file_nodes', figmaFileNodes, mode);
    }

    return figmaFiles;
}

async function createFigmaDocument(fileName, fileData, mode) {
  const document = path.join(__dirname,'../figma_files',`${fileName}.json`);
  try {
    const options = mode === 'development' ? JSON.stringify(fileData, null, '\t') : JSON.stringify(fileData)
    fs.mkdir(path.join(__dirname,'../figma_files'),{ recursive: true }, function(err) {
          if (err) throw err;

          fs.writeFile(document, options, function(e) {
          
          if (e) { //если возникла ошибка записи
            console.error(chalk.red('\nError failed to overwri  te file'), e.message);
          } 
          console.log(chalk.green(`\nData from figma received successfully and written to file "${fileName}.json"! _( ͡° ͜ʖ ͡°)_ `));
        });
    })
  } catch (e) {
    console.error(chalk.red('\nError getting figma file ¯\\_(ツ)_/¯:'), e.message);
  }
}

module.exports.createFile = function (folderName, fileName, fileData, mode='production') {
  folderName = folderName.replace(/ /g, '_').toLowerCase()
  fileName = fileName.split(' ').map(i=>i[0].toUpperCase() + i.slice(1)).join('').replace(/ /g, '');

  const document = path.join(__dirname,`../canvas/${folderName.replace(/ /g, '_').toLowerCase()}`,`${fileName}.json`);
  try {
    const options = mode === 'development' ? JSON.stringify(fileData, null, '\t') : JSON.stringify(fileData)
    fs.mkdir(path.join(__dirname,`../canvas/${folderName}`),{ recursive: true }, function(err) {
          if (err) throw err;

          fs.writeFile(document, options, {flag:'a'}, function(e) {
          
          if (e) { //если возникла ошибка записи
            console.error(chalk.red('\nError failed to overwri  te file'), e.message);
          } 
          console.log(chalk.green(`\nData from figma received successfully and written to file "${fileName}.json"! _( ͡° ͜ʖ ͡°)_ `));
        });
    })
  } catch (e) {
    console.error(chalk.red('\nError getting figma file ¯\\_(ツ)_/¯:'), e.message);
  }
}
