import fs from 'fs';
import chalk from 'chalk';
import { Spinner } from 'clui';
import { askQuestions } from './inquirer';
import { parseDateStrings } from './ParseDateStrings';
import { SiteChecker } from './SiteChecker';

const spinner = new Spinner('Checking available sites, please wait...');

const getSites = async (): Promise<void> => {
  const info = await askQuestions();

  spinner.start();

  try {
    const data = await JSON.parse(fs.readFileSync(info.filepath, 'utf-8'));

    const searchDates = parseDateStrings(data.search);

    const sites = new SiteChecker(data, searchDates, parseDateStrings).run();

    if (sites.length) {
      spinner.stop();
      console.log(
        chalk.yellow.bold(
          `Here are the available sites for
            ${searchDates.startDate
            .format('dddd, MMMM Do YYYY')} to
            ${searchDates.endDate
            .add(1, 'day')
            .format('dddd, MMMM Do YYYY')}:`
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
  } catch (err) {
    spinner.stop();
    console.log(
      chalk.red.bold('Oops! I encountered a problem: '),
      chalk.white(err.message)
    );
  }
};

export default getSites;
