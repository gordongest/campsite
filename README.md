# CampSite

**CampSite** is a Command Line Interface application that parses a local JSON data file and returns the available campsites for the dates specified within.

## Running CampSite

**CampSite** is easy to run! Open a new Terminal process, navigate to the directory where your JSON file is located, and run `npx campsite`. After installation, enter your name and choose the desired file using the selection tool. After a few moments, **CampSite** will let you know what's available.

***

### Approach to problem solving

At the highest level, CampSite uses the following approach:

- Take in the submitted data.
- Look through the campsites.
- Associate each campsite with its reservations, if they exist.
- Check for unreserved campsites.
- Compare the given search dates to any existing reservations and check whether the dates overlap or do not leave a sufficient gap.
- Return the campsites which are not reserved and/or do not present any conflicts.

In building the core function, I chose to take a largely functional approach using higher-order functions when possible to avoid mutation of data as well as achieve reduced space complexity and simplify testing.

### Assumptions and considerations

While considering the task, I made several assumptions:
- The dates specified in the provided JSON file refer to nights, rather than days. This is evidenced by a reservation that both begins *and* ends on June 1, 2018.
- Because of that, searching for dates that are immediately adjacent to existing reservations is acceptable.
- There is no restriction on the minimum length of a reservation.
- Users may have an open-ended itinerary; they may wish to search for only a start date **or** only an end date, or no specific dates at all.
- Therefore, the user should only be prevented from viewing campsites that definitively could *not* accommodate their itinerary. In these cases, the application could be structured as to present the user with a calendar of available dates for the site they choose to view.

### Extensibility

Although this program defaults to check for single-night gaps, I have also specified an optional argument to allow for other minimum gaps. This should allow for some extensibility with additional development, and receives several tests to check for basic functionality.

### Testing

While testing the program, I strove to achieve thorough coverage using both unit and integration tests. As the bulk of the program's logic occurs in the `conflicts` method, it accordingly receives the greatest amount of testing. After ensuring that each inner method is returning its expected values, the outer method receives several integration tests.
