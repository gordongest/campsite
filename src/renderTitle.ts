import chalk from 'chalk';
import boxen from 'boxen';
import figlet from 'figlet';

const boxenOptions = {
  padding: 1,
  margin: 1,
  borderStyle: 'round',
  float: 'center',
  align: 'center',
};

export const renderTitle = (): void =>
  console.log(
    chalk.yellow(
      boxen(
        chalk.green(figlet.textSync('CampSite', { horizontalLayout: 'full' })),
        boxenOptions
      )
    )
  );