import fs from 'fs';
import { Spinner } from 'clui';
import { JSONData } from './interfaces';
import { askQuestions } from './askQuestions';
import { parseDateStrings } from './parseDateStrings';
import { SiteChecker } from './SiteChecker';
import { listSites, logErr } from './listSites';

const spinner = new Spinner('Checking available sites, please wait...');

export const getSites = async (): Promise<void> => {
  const { username, filepath } = await askQuestions();

  spinner.start();

  try {
    const { search, campsites, reservations }: JSONData = await JSON.parse(fs.readFileSync(filepath, 'utf-8'));

    const searchDates = parseDateStrings(search);

    const sites = new SiteChecker(campsites, reservations, searchDates, parseDateStrings).run();

    spinner.stop();

    listSites(sites, searchDates, username);
  } catch (err) {
    spinner.stop();

    logErr(err);
  }
};
