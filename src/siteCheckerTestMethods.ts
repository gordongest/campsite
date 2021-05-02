import moment from 'moment';
import { JSONdata, DateObject, MomentObject } from './interfaces';

const availableSites = (data: JSONdata, minGap: number = 1): string[] =>
  data.campsites.reduce((siteList: string[], site): string[] => {
    const searchQuery = data.search;

    // pseudo LEFT JOIN reservations ON reservations.campsiteId = campsites.id;
    const reservations = data.reservations.filter((reservation) => {
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

const parseDateStrings = (data: DateObject): MomentObject => {
  return {
    startDate: moment(data.startDate),
    endDate: moment(data.endDate),
  };
};

const conflicts = (
  reservations: DateObject[],
  search: DateObject,
  minGap: number
): boolean =>
  reservations.some((reservation) => {
    const parsedSearch = parseDateStrings(search);
    const parsedReservation = parseDateStrings(reservation);

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
        minGap + 1
    );
  });

export { availableSites, parseDateStrings, conflicts };
