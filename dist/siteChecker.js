"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteChecker = void 0;
var moment_1 = __importDefault(require("moment"));
var SiteChecker = /** @class */ (function () {
    function SiteChecker(data, minGap) {
        if (minGap === void 0) { minGap = 1; }
        this._data = data;
        this._minGap = minGap;
    }
    SiteChecker.prototype.availableSites = function (data, minGap) {
        var _this = this;
        return data.campsites.reduce(function (siteList, site) {
            var searchQuery = data.search;
            // pseudo LEFT JOIN reservations ON reservations.campsiteId = campsites.id;
            var reservations = data.reservations.filter(function (reservation) { return reservation.campsiteId === site.id; });
            if (!reservations.length) {
                siteList.push(site.name);
                return siteList;
            }
            if (!_this.conflicts(reservations, searchQuery, minGap)) {
                siteList.push(site.name);
                return siteList;
            }
            return siteList;
        }, []);
    };
    SiteChecker.prototype.parseDateStrings = function (data) {
        return {
            startDate: moment_1.default(data.startDate),
            endDate: moment_1.default(data.endDate),
        };
    };
    SiteChecker.prototype.conflicts = function (reservations, search, minGap) {
        var _this = this;
        return reservations.some(function (reservation) {
            var parsedSearch = _this.parseDateStrings(search);
            var parsedReservation = _this.parseDateStrings(reservation);
            return (
            // if search dates fall within an existing res
            (parsedSearch.startDate >= parsedReservation.startDate &&
                parsedSearch.startDate <= parsedReservation.endDate) ||
                (parsedSearch.endDate >= parsedReservation.startDate &&
                    parsedSearch.endDate <= parsedReservation.endDate) ||
                // if search dates overlap an entire res
                (parsedSearch.startDate <= parsedReservation.startDate &&
                    parsedSearch.endDate >= parsedReservation.endDate) ||
                // if search dates are not adjacent day or outside minGap
                parsedSearch.startDate.diff(parsedReservation.endDate, 'days') ===
                    minGap + 1 ||
                parsedReservation.startDate.diff(parsedSearch.endDate, 'days') ===
                    minGap + 1);
        });
    };
    SiteChecker.prototype.run = function () {
        return this.availableSites(this._data, this._minGap);
    };
    return SiteChecker;
}());
exports.SiteChecker = SiteChecker;
//# sourceMappingURL=SiteChecker.js.map