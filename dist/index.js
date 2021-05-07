#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var clear_1 = __importDefault(require("clear"));
var renderTitle_1 = require("./renderTitle");
var getSites_1 = require("./getSites");
clear_1.default();
renderTitle_1.renderTitle();
// (async function (): Promise<void> {
try {
    getSites_1.getSites();
}
catch (err) {
    console.log('Sorry, I ran into a problem. Have a look here:');
    console.log(err.message);
}
// })();
//# sourceMappingURL=index.js.map