"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteChecker = void 0;
var SiteChecker = /** @class */ (function () {
    function SiteChecker(_data, _searchDates, _dateParser, _minGap) {
        if (_minGap === void 0) { _minGap = 1; }
        this._data = _data;
        this._searchDates = _searchDates;
        this._dateParser = _dateParser;
        this._minGap = _minGap;
    }
    SiteChecker.prototype.availableSites = function (data, searchDates, minGap) {
        var _this = this;
        return data.campsites.reduce(function (siteList, site) {
            // pseudo LEFT JOIN reservations ON reservations.campsiteId = campsites.id;
            var reservations = data.reservations.filter(function (reservation) {
                return reservation.campsiteId === site.id;
            });
            if (!reservations.length) {
                siteList.push(site.name);
                return siteList;
            }
            if (!_this.conflicts(reservations, searchDates, minGap)) {
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
            var parsedReservation = _this.parseDateStrings(reservation);
            return (
            // if search dates fall within an existing res
            (searchDates.startDate >= parsedReservation.startDate &&
                searchDates.startDate <= parsedReservation.endDate) ||
                (searchDates.endDate >= parsedReservation.startDate &&
                    searchDates.endDate <= parsedReservation.endDate) ||
                // if search dates overlap an entire res
                (searchDates.startDate <= parsedReservation.startDate &&
                    searchDates.endDate >= parsedReservation.endDate) ||
                // if search dates are not adjacent day or outside minGap
                searchDates.startDate.diff(parsedReservation.endDate, 'days') ===
                    minGap + 1 ||
                parsedReservation.startDate.diff(searchDates.endDate, 'days') ===
                    minGap + 1);
        });
    };
    SiteChecker.prototype.run = function () {
        return this.availableSites(this._data, this._searchDates, this._minGap);
    };
    return SiteChecker;
}());
exports.SiteChecker = SiteChecker;
//# sourceMappingURL=SiteChecker.js.map