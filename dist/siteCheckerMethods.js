"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conflicts = exports.parseDateStrings = exports.availableSites = void 0;
var moment_1 = __importDefault(require("moment"));
var availableSites = function (data, minGap) {
    if (minGap === void 0) { minGap = 1; }
    return data.campsites.reduce(function (siteList, site) {
        var searchQuery = data.search;
        // pseudo LEFT JOIN reservations ON reservations.campsiteId = campsites.id;
        var reservations = data.reservations.filter(function (reservation) {
            return reservation.campsiteId === site.id;
        });
        if (!reservations.length) {
            siteList.push(site.name);
            return siteList;
        }
        if (!conflicts(reservations, searchQuery, minGap)) {
            siteList.push(site.name);
            return siteList;
        }
        return siteList;
    }, []);
};
exports.availableSites = availableSites;
var parseDateStrings = function (data) {
    return {
        startDate: moment_1.default(data.startDate),
        endDate: moment_1.default(data.endDate),
    };
};
exports.parseDateStrings = parseDateStrings;
var conflicts = function (reservations, search, minGap) {
    return reservations.some(function (reservation) {
        var parsedSearch = parseDateStrings(search);
        var parsedReservation = parseDateStrings(reservation);
        return (
        // if search dates fall within an existing res
        (parsedSearch.startDate >= parsedReservation.startDate &&
            parsedSearch.startDate <= parsedReservation.endDate) ||
            (parsedSearch.endDate >= parsedReservation.startDate &&
                parsedSearch.endDate <= parsedReservation.endDate) ||
            // if search dates are not adjacent day or outside minGap
            parsedSearch.startDate.diff(parsedReservation.endDate, 'days') ===
                minGap + 1 ||
            parsedReservation.startDate.diff(parsedSearch.endDate, 'days') ===
                minGap + 1);
    });
};
exports.conflicts = conflicts;
//# sourceMappingURL=siteCheckerMethods.js.map