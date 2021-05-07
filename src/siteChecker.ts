import { DateObject, MomentObject, SiteObject } from './interfaces';

export class SiteChecker {
  constructor(
    private _campsites: SiteObject[],
    private _reservations: DateObject[],
    private _searchDates: MomentObject,
    private _dateParser: (dates: DateObject) => MomentObject,
    private _minGap: number = 1
  ) {}

  private availableSites(
    campsites: SiteObject[],
    reservations: DateObject[],
    searchDates: MomentObject,
    minGap: number
  ): string[] {
    return campsites.reduce((siteList: string[], site): string[] => {
      // pseudo LEFT JOIN reservations ON reservations.campsiteId = campsites.id;
      const siteReservations = reservations.filter((reservation) =>
        reservation.campsiteId === site.id
      );

      if (!siteReservations.length) {
        siteList.push(site.name);
        return siteList;
      }

      if (!this.conflicts(siteReservations, searchDates, minGap)) {
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
    return this.availableSites(this._campsites, this._reservations, this._searchDates, this._minGap);
  }
}
