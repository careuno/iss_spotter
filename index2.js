//https://web.compass.lighthouselabs.ca/days/w02d4/activities/912

const { nextISSTimesForMyLocation } = require('./iss_promised');
const { printPassTimes } = require('./index');

/* Require and call the function fetchMyIP in this file. Since this function returns a promise, call .then on its return value. This then call should take in a callback which accepts the response body and, for now, prints it to the screen. */

//const { fetchMyIP } = require('./iss_promised');
// STEP 1: 
// fetchMyIP()
//   .then(body => console.log(body));  //Prints entire JSON string response : {"ip":"10.22.100.000"}

// // STEP 2: 
// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log(body));

// // STEP 3:
// nextISSTimesForMyLocation()
//   .then(fetchMyIP)
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log('response body:', body));

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
 