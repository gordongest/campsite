import fs from 'fs';
import moment from 'moment';
import chalk from 'chalk';
import CLI, { Spinner } from 'clui';
import askQuestions from './inquirer';
import { availableSites } from './siteChecker'

const spinner = new Spinner('Checking available sites, please wait...');

const getSites = async (): Promise<void> => {
  const info = await askQuestions();

  spinner.start();

  try {
    const data = await JSON.parse(fs.readFileSync(info.filepath, 'utf-8'));

    const startDate = moment(data.search.startDate).format('dddd, MMMM Do YYYY');
    const endDate = moment(data.search.endDate).format('dddd, MMMM Do YYYY');

    const sites = availableSites(data);

    if (sites.length) {
      spinner.stop();
      console.log(
        chalk.yellow.bold(
          `Here are the available sites for ${startDate} to ${endDate}:`
        )
      );
      sites.forEach((site) => {
        console.log(chalk.bold(site));
      });
      console.log(
        chalk.green.bold(
          `Thanks for using CampSite, ${info.username}! Enjoy your trip!`
        )
      );
    } else {
      spinner.stop();
      console.log(
        chalk.yellow.bold(
          'Sorry, we were unable to find any sites for that search. Try some other dates!'
        )
      );
    }
  } catch(err) {
    spinner.stop();
    console.log(
      chalk.red.bold('Oops! I encountered a problem: '), chalk.white(err.message)
    );
  }
}

export default getSites;