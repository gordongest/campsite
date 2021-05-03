import moment from 'moment';
import { JSONdata, DateObject, MomentObject } from './interfaces';

export class SiteChecker {
  _data: JSONdata;
  _minGap: number;

  constructor(data: JSONdata, minGap: number = 1) {
    this._data = data;
    this._minGap = minGap;
  }

  availableSites(data: JSONdata, minGap: number): string[] {
    return data.campsites.reduce((siteList: string[], site): string[] => {
      const searchQuery = data.search;

      // pseudo LEFT JOIN reservations ON reservations.campsiteId = campsites.id;
      const reservations = data.reservations.filter(
        (reservation) => reservation.campsiteId === site.id
      );

      if (!reservations.length) {
        siteList.push(site.name);
        return siteList;
      }

      if (!this.conflicts(reservations, searchQuery, minGap)) {
        siteList.push(site.name);
        return siteList;
      }

      return siteList;
    }, []);
  }

  parseDateStrings(data: DateObject): MomentObject {
    return {
      startDate: moment(data.startDate),
      endDate: moment(data.endDate),
    };
  }

  conflicts(
    reservations: DateObject[],
    search: DateObject,
    minGap: number
  ): boolean {
    return reservations.some((reservation) => {
      const parsedSearch = this.parseDateStrings(search);
      const parsedReservation = this.parseDateStrings(reservation);

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
          minGap + 1
      );
    });
  }

  run() {
    return this.availableSites(this._data, this._minGap);
  }
}
