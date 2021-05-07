import { JSONdata, DateObject, MomentObject } from './interfaces';

export class SiteChecker {
  constructor(
    private _data: JSONdata,
    private _searchDates: MomentObject,
    private _dateParser: (dates: DateObject) => MomentObject,
    private _minGap: number = 1
  ) {}

  private availableSites(
    data: JSONdata,
    searchDates: MomentObject,
    minGap: number
  ): string[] {
    return data.campsites.reduce((siteList: string[], site): string[] => {
      // pseudo LEFT JOIN reservations ON reservations.campsiteId = campsites.id;
      const reservations = data.reservations.filter((reservation) =>
        reservation.campsiteId === site.id
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

  private parseDateStrings(dates: DateObject): MomentObject {
    return this._dateParser(dates);
  }

  private conflicts(
    reservations: DateObject[],
    searchDates: MomentObject,
    minGap: number
  ): boolean {
    return reservations.some((reservation) => {
      const {
        startDate: searchStart,
        endDate: searchEnd
      } = searchDates;

      const {
        startDate: resStart,
        endDate: resEnd
      } = this.parseDateStrings(reservation);

      return (
        // if search dates fall within an existing res
        (searchStart >= resStart && searchStart <= resEnd) ||
        (searchEnd >= resStart && searchEnd <= resEnd) ||
        // if search dates overlap an entire res
        (searchStart <= resStart && searchEnd >= resEnd) ||
        // if search dates are not adjacent day or outside minGap
        searchStart.diff(resEnd, 'days') === minGap + 1 ||
        resStart.diff(searchEnd, 'days') === minGap + 1
      );
    });
  }

  run() {
    return this.availableSites(this._data, this._searchDates, this._minGap);
  }
}
