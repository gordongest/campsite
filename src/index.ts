#!/usr/bin/env node

import clear from 'clear';
import { renderTitle } from './renderTitle';
import { getSites } from './getSites';

clear();

renderTitle();

try {
  getSites();
} catch (err) {
  console.log('Sorry, I ran into a problem. Have a look here:');
  console.log(err.message);
}
