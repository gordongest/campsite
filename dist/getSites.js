"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var chalk_1 = __importDefault(require("chalk"));
var clui_1 = require("clui");
var inquirer_1 = require("./inquirer");
var parseDateStrings_1 = require("./parseDateStrings");
var SiteChecker_1 = require("./SiteChecker");
var spinner = new clui_1.Spinner('Checking available sites, please wait...');
var getSites = function () { return __awaiter(void 0, void 0, void 0, function () {
    var info, data, searchDates, sites, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, inquirer_1.askQuestions()];
            case 1:
                info = _a.sent();
                spinner.start();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, JSON.parse(fs_1.default.readFileSync(info.filepath, 'utf-8'))];
            case 3:
                data = _a.sent();
                searchDates = parseDateStrings_1.parseDateStrings(data.search);
                sites = new SiteChecker_1.SiteChecker(data, searchDates, parseDateStrings_1.parseDateStrings).run();
                if (sites.length) {
                    spinner.stop();
                    console.log(chalk_1.default.yellow.bold("Here are the available sites for\n            " + searchDates.startDate
                        .format('dddd, MMMM Do YYYY') + " to\n            " + searchDates.endDate
                        .add(1, 'day')
                        .format('dddd, MMMM Do YYYY') + ":"));
                    sites.forEach(function (site) {
                        console.log(chalk_1.default.bold(site));
                    });
                    console.log(chalk_1.default.green.bold("Thanks for using CampSite, " + info.username + "! Enjoy your trip!"));
                }
                else {
                    spinner.stop();
                    console.log(chalk_1.default.yellow.bold('Sorry, we were unable to find any sites for that search. Try some other dates!'));
                }
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                spinner.stop();
                console.log(chalk_1.default.red.bold('Oops! I encountered a problem: '), chalk_1.default.white(err_1.message));
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.default = getSites;
//# sourceMappingURL=getSites.js.map