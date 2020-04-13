const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const apiFigma = require('./api');

module.exports = {
    ...apiFigma,
    getFigmaFiles
}


async function getFigmaFiles(figmaKey, figmaApiKey,mode) {
    const {getHeaders, getFigmaFiles, getFigmaFileNodes, getFigmaFileImages, getFigmaFileImagesFills} = apiFigma; 

    const headers = getHeaders(figmaApiKey)

    const figmaFiles = await getFigmaFiles({figmaKey, headers});
  
    const figmaFileNodes = await getFigmaFileNodes({figmaKey, headers, ids:'91:119'});

    const figmaFileImages = await getFigmaFileImages({figmaKey, headers, ids:'91:122'});

    const figmaFileImagesFills = await getFigmaFileImagesFills({figmaKey, headers});

    const files = [
        {
            name: 'figma_files',
            data: figmaFiles
        },
        {
            name: 'figma_file_nodes',
            data: figmaFileNodes
        },
        {
            name: 'figma_file_images',
            data: figmaFileImages
        },
         {
            name: 'figma_file_images_fills',
            data: figmaFileImagesFills
        }
    ]

    files.forEach(file=>{
        createFigmaDocument(file, mode);
    })
 
}

async function createFigmaDocument(file, mode) {

    const document = path.join(__dirname,'../figma_files',`${file.name}.json`);
    try {
      // figmaGenerate.runFigmaReact({fileKey, headers, figmaApiKey})
      const options = mode === 'development' ? JSON.stringify(file.data, null, '\t') : JSON.stringify(file.data)
  
      fs.mkdir(path.join(__dirname,'../figma_files'),{ recursive: true }, function(err) {

           if (err) throw err;
  
           fs.writeFile(document, options, function(e) {
            
            if (e) { //если возникла ошибка записи
              console.error(chalk.red('\nError failed to overwri  te file'), e.message);
            } 
            console.log(chalk.green('\nData from figma received successfully! _( ͡° ͜ʖ ͡°)_ '));
          });
      })
   
    } catch (e) {
      console.error(chalk.red('\nError getting figma file ¯\\_(ツ)_/¯:'), e.message);
    }
  }