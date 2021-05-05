import { JSONdata, DateObject, MomentObject } from './interfaces';

export class SiteChecker {
  constructor(
    public _data: JSONdata,
    public _searchDates: MomentObject,
    public _dateParser: (dates: DateObject) => MomentObject,
    public _minGap: number = 1
  ) {}

  availableSites(
    data: JSONdata,
    searchDates: MomentObject,
    minGap: number
  ): string[] {
    return data.campsites.reduce((siteList: string[], site): string[] => {
      // pseudo LEFT JOIN reservations ON reservations.campsiteId = campsites.id;
      const reservations = data.reservations.filter(
        (reservation) => reservation.campsiteId === site.id
      );

      if (!reservations.length) {
        siteList.push(site.name);
        return siteList;
      }

      if (!this.conflicts(reservations, searchDates, minGap)) {
        siteList.push(site.name);
        return siteList;
      }

      return siteList;
    }, []);
  }

  parseDateStrings(dates: DateObject): MomentObject {
    return this._dateParser(dates);
  }

  conflicts(
    reservations: DateObject[],
    searchDates: MomentObject,
    minGap: number
  ): boolean {
    return reservations.some((reservation) => {
      const parsedReservation = this.parseDateStrings(reservation);

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
          minGap + 1
      );
    });
  }

  run() {
    return this.availableSites(this._data, this._searchDates, this._minGap);
  }
}
