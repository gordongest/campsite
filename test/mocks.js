const mockData = (data, startDate, endDate) => {
  return {
    search: {
      startDate: startDate,
      endDate: endDate,
    },
    campsites: data.campsites,
    reservations: data.reservations,
  };
};

const mockSearch = (startDate, endDate) => {
  return {
    startDate: startDate,
    endDate: endDate,
  };
};

const mockReservations = (data, index) => {
  return [
    {
      campsiteId: data[index].campsiteId,
      startDate: data[index].startDate,
      endDate: data[index].endDate,
    },
  ];
};

module.exports = { mockData, mockSearch, mockReservations };