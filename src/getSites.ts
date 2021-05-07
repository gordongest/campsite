import fs from 'fs';
import { Spinner } from 'clui';
import { askQuestions } from './inquirer';
import { parseDateStrings } from './parseDateStrings';
import { listSites } from './listSites';
import { errLog } from './errLog';
import { SiteChecker } from './SiteChecker';

const spinner = new Spinner('Checking available sites, please wait...');

export const getSites = async (): Promise<void> => {
  const { username, filepath } = await askQuestions();

  spinner.start();

  try {
    const { search, campsites, reservations } = await JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    const searchDates = parseDateStrings(search);
    const sites = new SiteChecker(campsites, reservations, searchDates, parseDateStrings).run();

    spinner.stop();
    listSites(sites, searchDates, username);
  } catch (err) {
    spinner.stop();
    errLog(err);
  }
};
