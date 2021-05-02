"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conflicts = exports.parseDateStrings = exports.availableSites = void 0;
var moment_1 = __importDefault(require("moment"));
// **** MAIN FUNCTION ****
var availableSites = function (data, minGap) {
    if (minGap === void 0) { minGap = 1; }
    return data.campsites.reduce(function (siteList, site) {
        var searchQuery = data.search;
        // pseudo LEFT JOIN reservations ON reservations.campsiteId = campsites.id;
        var reservations = data.reservations.filter(function (reservation) {
            return reservation.campsiteId === site.id;
        });
        // if the site is not reserved, add it to the list
        if (!reservations.length) {
            siteList.push(site.name);
            return siteList;
        }
        // if there are no overlap or gap conflicts, add it to the list
        if (!exports.conflicts(reservations, searchQuery, minGap)) {
            siteList.push(site.name);
            return siteList;
        }
        return siteList;
    }, []);
};
exports.availableSites = availableSites;
// **** HELPER FUNCTIONS ****
// coerces date strings to timestamps
var parseDateStrings = function (data) {
    return {
        startDate: moment_1.default(data.startDate),
        endDate: moment_1.default(data.endDate),
    };
};
exports.parseDateStrings = parseDateStrings;
// checks for reservation or gap conflicts
var conflicts = function (reservations, search, minGap) {
    return reservations.some(function (reservation) {
        var parsedSearch = exports.parseDateStrings(search);
        var parsedReservation = exports.parseDateStrings(reservation);
        // check for conflicts
        return (
        // if startDate falls within an existing res
        (parsedSearch.startDate >= parsedReservation.startDate &&
            parsedSearch.startDate <= parsedReservation.endDate) ||
            // if endDate falls within an existing res
            (parsedSearch.endDate >= parsedReservation.startDate &&
                parsedSearch.endDate <= parsedReservation.endDate) ||
            // if startDate is not day following or outside minGap of existing res
            parsedSearch.startDate.diff(parsedReservation.endDate, 'days') ===
                minGap + 1 ||
            // if endDate is not day prior to or outside minGap of existing res
            parsedReservation.startDate.diff(parsedSearch.endDate, 'days') ===
                minGap + 1);
    });
};
exports.conflicts = conflicts;
//# sourceMappingURL=siteChecker.js.map