import moment from 'moment';

// **** INTERFACES ****

interface JSONdata {
  search: DateObject;
  campsites: SiteObject[];
  reservations: DateObject[];
}

interface SiteObject {
  id: number;
  name: string;
}

interface DateObject {
  campsiteId?: number;
  startDate: string;
  endDate: string;
}

interface MomentObject {
  startDate: moment.Moment;
  endDate: moment.Moment;
}

// **** MAIN FUNCTION ****

export const availableSites = (
  data: JSONdata,
  minGap: number = 1
): string[] => {
  return data.campsites.reduce((siteList: string[], site): string[] => {
    const searchQuery = data.search;

    // pseudo LEFT JOIN reservations ON reservations.campsiteId = campsites.id;
    const reservations = data.reservations.filter((reservation) => {
      return reservation.campsiteId === site.id;
    });

    // if the site is not reserved, add it to the list
    if (!reservations.length) {
      siteList.push(site.name);
      return siteList;
    }

    // if there are no overlap or gap conflicts, add it to the list
    if (!conflicts(reservations, searchQuery, minGap)) {
      siteList.push(site.name);
      return siteList;
    }

    return siteList;
  }, []);
};

// **** HELPER FUNCTIONS ****

// coerces date strings to timestamps
export const parseDateStrings = (data: DateObject): MomentObject => {
  return {
    startDate: moment(data.startDate),
    endDate: moment(data.endDate),
  };
};

// checks for reservation or gap conflicts
export const conflicts = (
  reservations: DateObject[],
  search: DateObject,
  minGap: number
): boolean => {
  return reservations.some((reservation) => {
    const parsedSearch = parseDateStrings(search);
    const parsedReservation = parseDateStrings(reservation);

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
        minGap + 1
    );
  });
};