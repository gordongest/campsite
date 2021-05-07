import inquirer from 'inquirer';
import chalk from 'chalk';
import fileTreeSelectionPrompt from 'inquirer-file-tree-selection-prompt';
import { InfoObject } from './interfaces';

export const askQuestions = async (): Promise<InfoObject> => {
  inquirer.registerPrompt('file-tree-selection', fileTreeSelectionPrompt);

  const user: { username: string } = await inquirer
    .prompt({
      name: 'username',
      type: 'input',
      message: "Hey there! What's your name?",
      validate: function (value: string): boolean | string {
        if (value.length) {
          return true;
        } else {
          return "Sorry, I didn't catch that. Could you repeat your name?";
        }
      },
    })
    .then(({ username }) => {
      console.log(
        chalk.green('•'),
        chalk.bold(`Nice to meet you, ${username}!`)
      );
      return username;
    });

  const path: { filepath: string } = await inquirer.prompt({
    name: 'filepath',
    type: 'file-tree-selection',
    message: `Please select a JSON file:`,
    validate: function (value: string): boolean | string {
      if (value.length) {
        return true;
      } else {
        return 'Whoops! Looks like I missed your filepath. Mind trying again?';
      }
    },
  });

  return { username: user.username, filepath: path.filepath };
};
