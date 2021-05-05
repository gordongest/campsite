#!/usr/bin/env node

import clear from 'clear';
import chalk from 'chalk';
import boxen from 'boxen';
import figlet from 'figlet';
import getSites from './getSites';

const boxenOptions = {
  padding: 1,
  margin: 1,
  borderStyle: 'round',
  float: 'center',
  align: 'center',
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
      boxenOptions
    )
  )
);

run();
