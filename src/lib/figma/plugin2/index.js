const {getFigmaFiles, createFile} = require('./files')
const {generateFrame} = require('./components')
const chalk = require('chalk');

module.exports = {
    ...require('./files'),
    ...require('./api'),
    run
}

//RUN
async function run(options={}) {
    if(options) {
       const figma = await getFigmaFiles(options);
    //    const canvases = figma.document.children[2];
        const canvas = figma.document.children[2];

        canvas.name
        if(canvas.children) {
            canvas.children.forEach(elem => {
                if(elem.type="FRAME") {
                     const componentFrame = generateFrame(elem);  
                    createFile(canvas.name, elem.name, componentFrame);
                }
            });
        }



    //    canvases.forEach(canvas => {
    //        if(canvas.type === "CANVAS") {
    //             if(canvas.children) {
    //                 canvas.children.forEach(child => {
    //                     console.log('ITEM',child);
    //                 })
    //             }
    //        }
    //    });

    } else {
       console.error(chalk.red('\nNo parameters ¯\\_(ツ)_/¯:'));
    }
}
