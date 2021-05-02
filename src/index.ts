#!/usr/bin/env node

import boxen from 'boxen';
import clear from 'clear';
import chalk from 'chalk';
import figlet from 'figlet';
import getSites from './getSites';

const options = {
  padding: 1,
  margin: 1,
  borderStyle: 'round',
};

const run = async (): Promise<void> => {
  try {
    getSites();
  } catch (err) {
    console.log('Sorry, I ran into a problem. Have a look here:');
    console.log(err.message);
  }
};

clear();

console.log(
  chalk.yellow(
    boxen(
      chalk.green(figlet.textSync('CampSite', { horizontalLayout: 'full' })),
      options
    )
  )
);

run();
