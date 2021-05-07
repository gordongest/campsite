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

module.exports = { mockSearch, mockReservations };