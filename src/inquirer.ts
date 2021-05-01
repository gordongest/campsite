import inquirer from 'inquirer';
import PromptUI from 'inquirer/lib/ui/prompt';

const askQuestions = (): Promise<any> & { ui: PromptUI }=> {
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
  ];

  return inquirer.prompt(questions);
}

export default askQuestions;