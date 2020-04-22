const FileService = require('./services/file.service')
const ApiService = require('./services/api.service')
const GenerateCore = require('./core/generate.core')
const {SHARED,FILES_PATH} = require('./config/init')

class App {
    shared = null;
    fileService = null;
    apiService = null;
    generateCore = null;

    constructor(options) {
        this.shared = SHARED;
        this.shared.options = options;
        this.fileService = new FileService();
        this.apiService = new ApiService();
        this.generateCore = new GenerateCore(); 
    }
    
    async init() {
        const figma = await this.getFigmaFiles();
        if(figma.document) {
            this.shared.document = figma.document;
            if(figma.document.children) {
                const node = figma.document.children[0];
                this.generateCore.init(node, this.shared, figma.document);
            }
        }
    }

    async getFigmaFiles () {
        const {figmaFilesId, figmaApiKey, mode} = this.shared.options;

        const headers = this.apiService.getHeaders(figmaApiKey);
    
        const figmaFiles = await this.apiService.getFiles({figmaFilesId, headers});
        const figmaNodes = await this.apiService.getFileNodes({figmaFilesId, headers, ids:'91:122'});
         
        if(figmaFiles) {
            const figmaFilesOption = mode === 'development' ? JSON.stringify(figmaFiles, null, '\t') : JSON.stringify(figmaFiles)
            await this.fileService.createFile(FILES_PATH, 'figma_files.json', figmaFilesOption);
        }

        if(figmaNodes) {
          const figmaFilesNodeOption = mode === 'development' ? JSON.stringify(figmaNodes, null, '\t') : JSON.stringify(figmaFiles)
          await this.fileService.createFile(FILES_PATH, 'figma_node_file.json', figmaFilesNodeOption);
       }
    
        return figmaFiles;
    }
}

module.exports = App;