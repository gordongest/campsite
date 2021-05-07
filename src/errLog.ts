import chalk from 'chalk';

export const errLog = (err: { message: string }) =>
  console.log(
    chalk.red.bold('Oops! I encountered a problem: '),
    chalk.white(err.message)
  );