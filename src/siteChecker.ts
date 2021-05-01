import moment from 'moment';
import sampleData from './test-case.json';

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

const availableSites = (data: JSONdata, minGap: number = 1): string[] => {
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

// converts date strings to timestamps
const parseDateStrings = (data: DateObject): MomentObject => {
  return {
    startDate: moment(data.startDate),
    endDate: moment(data.endDate),
  };
};

// checks for reservation or gap conflicts
const conflicts = (
  reservations: DateObject[] | MomentObject[],
  search: DateObject | MomentObject,
  minGap: number
): boolean => {
  search = parseDateStrings(search as DateObject);

  for (let reservation of reservations) {
    reservation = parseDateStrings(reservation as DateObject);

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
      reservation.startDate.diff(search.endDate, 'days') === minGap + 1
    ) {
      return true;
    }
  }

  // if none of the above, no conflict
  return false;
};

const sites = availableSites(sampleData, 1);
console.log(
  `Available sites for dates ${sampleData.search.startDate} to ${sampleData.search.endDate}:`
);
sites.forEach((site) => {
  console.log(site);
});

module.exports = { availableSites, parseDateStrings, conflicts };
