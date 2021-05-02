import inquirer from 'inquirer';
import chalk from 'chalk';
import fileTreeSelectionPrompt from 'inquirer-file-tree-selection-prompt';

interface InfoObject {
  username: string;
  filepath: string;
}

const askQuestions = async (): Promise<InfoObject> => {
  inquirer.registerPrompt('file-tree-selection', fileTreeSelectionPrompt);

  const user = await inquirer
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
    .then((answers) => {
      console.info(
        chalk.green('•'),
        chalk.bold(`Nice to meet you, ${answers.username}!`)
      );
      return answers;
    });

  const path = await inquirer.prompt({
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

export default askQuestions;
