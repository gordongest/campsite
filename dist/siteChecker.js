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
// converts date strings to timestamps
var parseDateStrings = function (data) {
    return {
        startDate: moment_1.default(data.startDate),
        endDate: moment_1.default(data.endDate),
    };
};
exports.parseDateStrings = parseDateStrings;
// checks for reservation or gap conflicts
var conflicts = function (reservations, search, minGap) {
    search = exports.parseDateStrings(search);
    for (var _i = 0, reservations_1 = reservations; _i < reservations_1.length; _i++) {
        var reservation = reservations_1[_i];
        reservation = exports.parseDateStrings(reservation);
        // check for conflicts
        if (
        // if startDate falls within a current res
        (search.startDate >= reservation.startDate &&
            search.startDate <= reservation.endDate) ||
            // if endDate falls within a current res
            (search.endDate >= reservation.startDate &&
                search.endDate <= reservation.endDate) ||
            // if search start is not day following or outside minGap of res end
            search.startDate.diff(reservation.endDate, 'days') === minGap + 1 ||
            // if search end is not day prior to or outside minGap of res start
            reservation.startDate.diff(search.endDate, 'days') === minGap + 1) {
            return true;
        }
    }
    // if none of the above, no conflict
    return false;
};
exports.conflicts = conflicts;
// const sites = availableSites(sampleData, 1);
// console.log(
//   `Available sites for dates ${sampleData.search.startDate} to ${sampleData.search.endDate}:`
// );
// sites.forEach((site) => {
//   console.log(site);
// });
// export default { availableSites, parseDateStrings, conflicts };
//# sourceMappingURL=siteChecker.js.map