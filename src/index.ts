#!/usr/bin/env node

import boxen from 'boxen';
import clear from 'clear';
import chalk, { bold } from 'chalk';
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

boxen(run(), { padding: 1, borderStyle: 'bold', borderColor: 'cyan' });
