const moment = require('moment');
const testData = require('./testData.json');
const { mockSearch, mockReservations } = require('./mocks');
const { parseDateStrings, conflicts, availableSites } = require('./testMethods');


describe('Site Checker', () => {

  describe('inner methods', () => {

    describe('date parser', () => {
      it('returns an object', () => {
        const actualSearch = mockSearch('2021-04-30', '2021-05-02');

        expect(parseDateStrings(actualSearch)).toBeInstanceOf(Object);
      });

      it('returns an object with the desired keys', () => {
        const actualSearch = mockSearch('2021-04-30', '2021-05-02');

        expect(parseDateStrings(actualSearch)).toHaveProperty('startDate');
        expect(parseDateStrings(actualSearch)).toHaveProperty('endDate');
      });

      it('parses date strings correctly', () => {
        const actualSearch = mockSearch('2021-04-30', '2021-05-02');

        expect(parseDateStrings(actualSearch).startDate).toBeInstanceOf(moment);
        expect(parseDateStrings(actualSearch).endDate).toBeInstanceOf(moment);
      });
    });

    describe('conflict checker', () => {
      it('identifies an overlap conflict at search start', () => {
        const actualSearch = mockSearch('2021-04-30', '2021-05-02');
        const actualReservations = mockReservations(testData.reservations, 0);

        expect(conflicts(actualReservations, actualSearch, 1)).toEqual(true);
      });

      it('identifies an overlap conflict at search end', () => {
        const actualSearch = mockSearch('2021-05-04', '2021-05-07');
        const actualReservations = mockReservations(testData.reservations, 1);

        expect(conflicts(actualReservations, actualSearch, 1)).toEqual(true);
      });

      it('identifies an overlap conflict at both sides', () => {
        const actualSearch = mockSearch('2021-04-30', '2021-05-07');
        const actualReservations = testData.reservations;

        expect(conflicts(actualReservations, actualSearch, 1)).toEqual(true);
      });

      it('identifies a search that overlaps an entire reservation', () => {
        const actualSearch = mockSearch('2021-05-03', '2021-05-11');
        const actualReservations = mockReservations(testData.reservations, 1);

        expect(conflicts(actualReservations, actualSearch, 1)).toEqual(true);
      });

      it('identifies a gap conflict at search start', () => {
        const actualSearch = mockSearch('2021-05-03', '2021-05-05');
        const actualReservations = mockReservations(testData.reservations, 0);

        expect(conflicts(actualReservations, actualSearch, 1)).toEqual(true);
      });

      it('identifies a gap conflict at search end', () => {
        const actualSearch = mockSearch('2021-05-02', '2021-05-04');
        const actualReservations = mockReservations(testData.reservations, 1);

        expect(conflicts(actualReservations, actualSearch, 1)).toEqual(true);
      });

      it('identifies a gap conflict at both sides', () => {
        const actualSearch = mockSearch('2021-05-03', '2021-05-04');
        const actualReservations = testData.reservations;

        expect(conflicts(actualReservations, actualSearch, 1)).toEqual(true);
      });

      it('identifies a gap conflict of 3 nights prior', () => {
        const actualSearch = mockSearch('2021-04-22', '2021-04-24');
        const actualReservations = mockReservations(testData.reservations, 0);

        expect(conflicts(actualReservations, actualSearch, 3)).toEqual(true);
      });

      it('identifies a gap conflict of 2 nights following', () => {
        const actualSearch = mockSearch('2021-05-13', '2021-05-15');
        const actualReservations = mockReservations(testData.reservations, 1);

        expect(conflicts(actualReservations, actualSearch, 2)).toEqual(true);
      });

      it('identifies a non-conflicting following-day query', () => {
        const actualSearch = mockSearch('2021-05-02', '2021-05-04');
        const actualReservations = mockReservations(testData.reservations, 0);

        expect(conflicts(actualReservations, actualSearch, 1)).toEqual(false);
      });

      it('identifies a non-conflicting prior-day query', () => {
        const actualSearch = mockSearch('2021-05-02', '2021-05-05');
        const actualReservations = mockReservations(testData.reservations, 1);

        expect(conflicts(actualReservations, actualSearch, 1)).toEqual(false);
      });

      it('identifies a non-conflicting gap query', () => {
        const actualSearch = mockSearch('2021-05-05', '2021-05-06');
        const actualReservations = mockReservations(testData.reservations, 0);

        expect(conflicts(actualReservations, actualSearch, 2)).toEqual(false);
      });
    });
  });

  describe('primary method', () => {
    it('returns an array', () => {
      const actualSearch = mockSearch(null, null);

      expect(availableSites(testData, actualSearch, 1)).toBeInstanceOf(Array);
    });

    it('returns all sites when no search dates are provided', () => {
      const actualSearch = mockSearch(null, null);

      expect(availableSites(testData, actualSearch, 1)).toEqual([
        'Mountain Lodge',
        'Log Cabin',
        'Old Shack',
      ]);
    });

    it('returns compatible sites with only start date provided', () => {
      const actualSearch = mockSearch('2021-05-02', null);

      expect(availableSites(testData, actualSearch, 1)).toEqual(['Mountain Lodge', 'Log Cabin']);
    });

    it('returns compatible sites with only end date provided', () => {
      const actualSearch = mockSearch(null, '2021-04-28');

      expect(availableSites(testData, actualSearch, 1)).toEqual(['Log Cabin', 'Old Shack']);
    });

    it('returns compatible sites both dates provided', () => {
      const actualSearch = mockSearch('2021-05-04', '2021-05-07');

      expect(availableSites(testData, actualSearch, 1)).toEqual(['Mountain Lodge', 'Old Shack']);
    });
  });
});
