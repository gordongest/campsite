import CLI, { Spinner } from 'clui';
import Configstore from 'configstore';
import askQuestions from './inquirer';

const pkg = require('../package.json');

const conf = new Configstore(pkg.name);


const getSites = async () => {
  const info = await askQuestions();
  const spinner = new Spinner('Checking available sites, please wait...');

  spinner.start();
  // SITECHECKER ALGO HERE
  const sites = await 

  spinner.stop();
}


// const campSiteData = (filepath: string) => {
//   return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
// }

// const conf = new Configstore(campSiteData.name);