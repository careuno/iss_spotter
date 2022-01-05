////https://web.compass.lighthouselabs.ca/days/w02d4/activities/912

const request = require('request-promise-native');


// const fetchMyIP = new Promise((resolve, reject) => {
//   // do something and resolve when finished or reject with an error
// });

// myPromise.then((data) => {
//   // do something with the resolved promises data
// });



/* Define and export fetchMyIP. This function should only have one line of code: fetch the IP address from the API, using the request function, and return the promise that is returned by request.

===> !! TIP !!: request, when called, returns a promise, and we want our function to return this same promise. */

const fetchMyIP = function() {
  //Define and export fetchMyIP. This function should only have one line of code: fetch the IP address from the API, using the request function, and return the promise that is returned by request.
  return request('https://api.ipify.org?format=json');
};



/* 
 * Makes a request to freegeoip.app using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 * 
 * Implement fetchCoordsByIP to use request for our second API call.

This function takes as input the JSON string (as it is returned from fetchMyIP) and therefore needs to parse this JSON content first, and then use the IP as part of the next API call using request. It should therefore be two lines of code at most:

Parse the JSON string and extract the ip from it
Make a request to freegeoip and return the promise from request
 */

//body = {"ip":"142.59.163.201"}
const fetchCoordsByIP = function(body) {
const IP = JSON.parse(body).ip
return request(`https://api.freegeoip.app/json/${IP}?apikey=84db5df0-53e7-11ec-92c7-edd4f1e9f563`)
};


// const fetchISSFlyOverTimes = function(body) {
//   const { latitude, longitude} = JSON.parse(body);
//   return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`)
//   };

//ANSWER
const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};


//RIGHT!!
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};



module.exports = { nextISSTimesForMyLocation };


