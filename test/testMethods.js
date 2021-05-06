const moment = require('moment');

const parseDateStrings = (dates) => {
  return {
    startDate: moment(dates.startDate),
    endDate: moment(dates.endDate),
  };
};

const conflicts = (reservations, searchDates, minGap) => {
  return reservations.some((reservation) => {
    const parsedSearch = parseDateStrings(searchDates)
    const parsedReservation = parseDateStrings(reservation);

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
};

const availableSites = (data, searchDates, minGap) => {
  return data.campsites.reduce((siteList, site) => {
    // pseudo LEFT JOIN reservations ON reservations.campsiteId = campsites.id;
    const reservations = data.reservations.filter(
      (reservation) => reservation.campsiteId === site.id
    );

    if (!reservations.length) {
      siteList.push(site.name);
      return siteList;
    }

    if (!conflicts(reservations, searchDates, minGap)) {
      siteList.push(site.name);
      return siteList;
    }

    return siteList;
  }, []);
};

module.exports = { parseDateStrings, conflicts, availableSites }