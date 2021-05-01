import inquirer from 'inquirer';
import PromptUI from 'inquirer/lib/ui/prompt';

interface infoObject {
  name: string;
  filepath: string;
}

const askQuestions = ()  => {
  const questions = [
    {
      name: 'username',
      type: 'input',
      message: 'Hey there! What\'s your name?',
      validate: function(value: string): boolean | string {
        if (value.length) {
          return true;
        } else {
          return 'Sorry, I didn\'t catch that. Could you repeat your name?'
        }
      }
    },
    {
      name: 'filepath',
      type: 'input',
      message: 'Please enter the path for your JSON file:',
      validate: function(value: string): boolean | string {
        if (value.length) {
          return true;
        } else {
          return 'Whoops! Looks like I missed your filepath. Mind entering it again?';
        }
      }
    }
  ];

  return inquirer.prompt(questions);
}

export default askQuestions;