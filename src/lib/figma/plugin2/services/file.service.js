const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const ApiService = require('./api.service')
const {FILES_PATH,BASE_URL} = require('../config/init.js')

class FileService {
    apiFigma = null;

    constructor() {
        this.apiFigma = new ApiService(BASE_URL); 
    }

    async createFile (folderPath, fileName, fileData, _flag='w') {
        try {
          let dir = __dirname.split('\\');
          let dirIdx = dir.findIndex(i=> i === 'src');
          dir = dir.splice(0,dirIdx).join('\\');
          const document = path.join(dir, folderPath, `${fileName}`);
          
          fs.mkdir(path.join(dir, folderPath),{ recursive: true }, function(err) {
                if (err) throw err;
      
                fs.writeFile(document, fileData, {flag: _flag}, function(e) {
                
                if (e) { //если возникла ошибка записи
                  console.error(chalk.red('\nError failed to overwri  te file'), e.message);
                  throw e;
                } 
                console.log(chalk.green(`\nData from figma received successfully and written to file "${folderPath}/${fileName}"! _( ͡- ͜ʖ ͡°)_ `));
              });
          })
        } catch (e) {
          console.error(chalk.red('\nError getting figma file ¯\\_(ツ)_/¯:'), e.message);
        }
    }
}

module.exports = FileService


