import fs from 'fs';
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import getSites from './getSites'

clear();

console.log(
  chalk.green(figlet.textSync('CampSite', { horizontalLayout: 'full' }))
);

const run = async (): Promise<void> => {
  try {
    getSites();
  } catch(err) {
    console.log('Sorry, I ran into a problem. Have a look at this:');
    console.log(err.message)
  }
}

run();
