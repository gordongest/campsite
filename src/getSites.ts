import fs from 'fs';
import moment from 'moment';
import CLI, { Spinner } from 'clui';
import askQuestions from './inquirer';
import { availableSites } from './siteChecker'

const spinner = new Spinner('Checking available sites, please wait...');

const getSites = async () => {
  const info = await askQuestions();

  spinner.start();

  try {
    const data = await JSON.parse(fs.readFileSync(info.filepath, 'utf-8'));

    const startDate = moment(data.search.startDate).format('dddd, MMMM Do YYYY');
    const endDate = moment(data.search.endDate).format('dddd, MMMM Do YYYY');

    const sites = availableSites(data, info.gap);

    if (sites.length) {
      spinner.stop();
      console.log(
        `Available sites for ${startDate} to ${endDate}:`
      );
      sites.forEach((site) => {
        console.log(site);
      });
      console.log(`Thanks for using CampSite, ${info.username}! Enjoy your trip!`)
    } else {
      spinner.stop();
      console.log(
        'Sorry, we were unable to find any sites for that search. Try some other dates!'
      );
    }
  } catch(err) {
    spinner.stop();
    console.log(err.message);
  }
}

export default getSites;