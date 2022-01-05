//It will require and run our main fetch function.


// index.js
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, IP) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   } else {
//     console.log('It worked! Returned IP:', IP);
//     //console.log(typeof IP) //Prints: string
//   }
//   console.log('It worked! Return IP:' , ip);
// });


// fetchCoordsByIP('142.59@.163.201', (error, coordinates) => {
//   // console.log(error);
//   // console.log(data);
//   if (error) {
//     console.log("It didn't work!", error.message); //if you don't put error.message you get a bunch of other error messages underneath your error string
//     return;
//   } //else {
//   //   console.log('It worked! Returned IP:', IP);
//   //   //console.log(typeof IP) //Prints: string
//   console.log('It worked! Return coordinates:' , coordinates);
// });

fetchISSFlyOverTimes({ latitude: 43.6426, longitude: -79.4002 }, (error, flyOverTimes) => {
  // console.log(error);
  // console.log(data);
  if (error) {
    console.log("It didn't work!", error.message); //if you don't put error.message you get a bunch of other error messages underneath your error string
    return;
  } //else {
  //   console.log('It worked! Returned IP:', IP);
  //   //console.log(typeof IP) //Prints: string
  // }
  console.log('It worked! Return fly over times:' , flyOverTimes);
});


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});

const printPassTimes = function(flyOverTimes) {
  for (const time of flyOverTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(time.risetime);
    const duration = time.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

module.exports = { printPassTimes }