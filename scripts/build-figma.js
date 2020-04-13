const path = require('path');
const readline = require('readline');
const fs = require('fs');
const chalk = require('chalk');
const Confirm = require('prompt-confirm');
const figmaGenerate = require('../src/lib/figma/plugin2/index');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// Do this as the first thing so that any code reading it knows the right env.

let mode = 'development';
let project = '';
// let argv = null;
let project_settings = {};

if( process.argv.indexOf('--mode') !== -1){
  const idx = +process.argv.indexOf('--mode') + 1
  if(process.argv.slice(idx)[0] === 'dev' || process.argv.slice(idx)[0] === 'prod') {
    mode = process.argv.slice(idx)[0] === 'dev' ? 'development' : 'production'
  }
}

if(process.argv.indexOf('--project') !== -1){
  const idx = +process.argv.indexOf('--project') +1
  project = process.argv.slice(idx)[0]
}else if(process.argv.slice(2)[0] !== '--mode' && process.argv.slice(2)[0] !== '--project'){
   project = process.argv.slice(2)[0]
}

// process.env.BABEL_ENV = mode;
// process.env.NODE_ENV = mode;

//API_KEY_FIGMA
const figmaApiKey = '36399-20eb3704-2c13-449f-8309-398d28cdf954';

//ID_PROJECT
const figmaProjectId = 'b4LkTyJVzqRNTmY9m4uC9g';

//ID_PROJECT
// const figmaProjectId = 'InZsgUaqMorH2q5iapfUDK';
// const NODE_ENV = mode || 'development';

try {
  if(project){ //###### ОБНОВЛЕНИЯ ФАЙЛА ФИГМЫ ДЛЯ ОПРЕДЕЛЕННОГО ПРОЕКТА - ПОКА НЕ РЕАЛИЗОВАННО
      if(!fs.existsSync(path.join(__dirname,`../src/project/${project}/conf.json`))) { 
        throw new Error(chalk.red(`Project "${project}" not found ¯\\_(-_-)_/¯`));
      }
      project_settings = require(`../src/project/${project}/conf.json`);
      project_settings.dev.appBuild = '';
      process.env.PROJECT = JSON.stringify({...project_settings.main, ...project_settings.dev});
      process.env.PROJECT_NAME = project;
 
      // Ensure environment variables are read.
      require('../config/env');

      confirm(`Are you sure you want to rebuild figma in the ${project} project in ${mode} mode?`).then(answer => {
        if(answer && answer === true) {
          // getFigmaDocument(figmaProjectId )
          console.log(chalk.cyan('Module in development! Use the command \'npm build-figma\''))
        } else {
          console.log(chalk.cyan('Operation canceled!'))
          return false;
        }
      }).catch(e=>{
        console.log(chalk.red('Something went wrong ¯\\_(ツ)_/¯'), e)
      }) 
  }else{ //###### ОБНОВЛЕНИЯ ФАЙЛА ФИГМЫ ДЛЯ ВСЕХ ПРОЕКТОВ
        confirm(`Are you sure you want to rebuild figma in all projects in ${mode} mode?`).then(answer => {
          if(answer && answer === true) {
            figmaGenerate.getFigmaFiles(figmaProjectId, figmaApiKey, mode);
          } else {
            console.log(chalk.cyan('Operation canceled!'));
            return false;
          }
        }).catch(e=>{
          console.log(chalk.red('Something went wrong ¯\\_(ツ)_/¯'), e)
        })
  }
} catch (e) {
  console.log(e)
  console.log(chalk.red('\nError in the process of rebuilding figma¯\\_(-_-)_/¯'));
  return false;
}

function confirm(question) {
  return new Confirm(question)
  .run()
  .then(function(answer) {
    return answer;
  });
}