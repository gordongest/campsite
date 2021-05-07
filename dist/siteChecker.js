"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteChecker = void 0;
var SiteChecker = /** @class */ (function () {
    function SiteChecker(_campsites, _reservations, _searchDates, _dateParser, _minGap) {
        if (_minGap === void 0) { _minGap = 1; }
        this._campsites = _campsites;
        this._reservations = _reservations;
        this._searchDates = _searchDates;
        this._dateParser = _dateParser;
        this._minGap = _minGap;
    }
    SiteChecker.prototype.availableSites = function (campsites, reservations, searchDates, minGap) {
        var _this = this;
        return campsites.reduce(function (siteList, site) {
            // pseudo LEFT JOIN reservations ON reservations.campsiteId = campsites.id;
            var siteReservations = reservations.filter(function (reservation) {
                return reservation.campsiteId === site.id;
            });
            if (!siteReservations.length) {
                siteList.push(site.name);
                return siteList;
            }
            if (!_this.conflicts(siteReservations, searchDates, minGap)) {
                siteList.push(site.name);
                return siteList;
            }
            return siteList;
        }, []);
    };
    SiteChecker.prototype.parseDateStrings = function (dates) {
        return this._dateParser(dates);
    };
    SiteChecker.prototype.conflicts = function (reservations, searchDates, minGap) {
        var _this = this;
        return reservations.some(function (reservation) {
            var searchStart = searchDates.startDate, searchEnd = searchDates.endDate;
            var _a = _this.parseDateStrings(reservation), resStart = _a.startDate, resEnd = _a.endDate;
            return (
            // if search dates fall within an existing res
            (searchStart >= resStart && searchStart <= resEnd) ||
                (searchEnd >= resStart && searchEnd <= resEnd) ||
                // if search dates overlap an entire res
                (searchStart <= resStart && searchEnd >= resEnd) ||
                // if search dates are not adjacent day or outside minGap
                searchStart.diff(resEnd, 'days') === minGap + 1 ||
                resStart.diff(searchEnd, 'days') === minGap + 1);
        });
    };
    SiteChecker.prototype.run = function () {
        return this.availableSites(this._campsites, this._reservations, this._searchDates, this._minGap);
    };
    return SiteChecker;
}());
exports.SiteChecker = SiteChecker;
//# sourceMappingURL=SiteChecker.js.map