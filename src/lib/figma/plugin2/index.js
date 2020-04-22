const App = require('./app')
const chalk = require('chalk');

//RUN
module.exports.run = async function (options={}) {
    try{
        if(options) {
           const app = new App(options);
           app.init();
        } else {
           console.error(chalk.red('\nNo parameters ¯\\_(ツ)_/¯:'));
        }
    }catch(e){
        console.error(chalk.red('\nAn error occurred while running the script ¯\\_(ツ)_/¯: ', e));
    }
}
