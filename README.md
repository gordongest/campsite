# CampSite

**CampSite** is a Command Line Interface application that parses a local JSON data file and returns the available campsites for the specified dates.

## Running CampSite

**CampSite** is easy to run! Open a new Terminal process, navigate to the directory where your JSON file is located, and run `npx campsite`. After installation, enter your name and choose the desired file using the selection tool. After a few moments, **CampSite** will let you know what's available.

***

### Approach to problem solving

At the highest level, CampSite uses the following approach:

- Look through the campsites
- Associate each campsite with its reservations
- Compare the given search dates to existing reservations and check whether the dates overlap or do not leave a sufficient gap
- Return campsites that are either not reserved or which don't have any conflicts

In building the core function, I chose to take a largely functional approach using implicit data return and higher-order functions when possible.

