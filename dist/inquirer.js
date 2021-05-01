"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = __importDefault(require("inquirer"));
var askQuestions = function () {
    var questions = [
        {
            name: 'username',
            type: 'input',
            message: 'Hey there! What\'s your name?',
            validate: function (value) {
                if (value.length) {
                    return true;
                }
                else {
                    return 'Sorry, I didn\'t catch that. Could you repeat your name?';
                }
            }
        },
        {
            name: 'filepath',
            type: 'input',
            message: 'Please enter the path for your JSON file:',
            validate: function (value) {
                if (value.length) {
                    return true;
                }
                else {
                    return 'Whoops! Looks like I missed your filepath. Mind entering it again?';
                }
            }
        }
    ];
    return inquirer_1.default.prompt(questions);
};
exports.default = askQuestions;
//# sourceMappingURL=inquirer.js.map