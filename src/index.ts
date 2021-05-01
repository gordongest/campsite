import fs from 'fs';
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import askQuestions from './inquirer';

clear();

console.log(
  chalk.green(figlet.textSync('CampSite', { horizontalLayout: 'full' }))
);

const run = async (): Promise<void> => {
  const credentials = await askQuestions();
  // console.log(`Hi, ${credentials.username}!`);
  return credentials;
}

// possible roadmap:
  // add filepath query to askQuestions
  // return filepath from askQuestions
  // pass filepath to campSiteData()
  // generate conf object
