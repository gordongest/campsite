import chalk from 'chalk';
import { MomentObject } from './interfaces';

export const listSites = (sites: string[], { startDate, endDate }: MomentObject, username: string) => {
  if (sites.length) {
    console.log(
      chalk.yellow.bold(
        `Here are the available sites for ${startDate.format('dddd, MMMM Do YYYY')} to ${endDate.add(1, 'day').format('dddd, MMMM Do YYYY')}:`
      )
    );
    sites.forEach((site) =>
      console.log(chalk.bold(site))
    );
    console.log(
      chalk.green.bold(
        `Thanks for using CampSite, ${username}! Enjoy your trip!`
      )
    );
  } else {
    console.log(
      chalk.yellow.bold(
        'Sorry, we were unable to find any sites for that search. Try some other dates!'
      )
    );
  }
}