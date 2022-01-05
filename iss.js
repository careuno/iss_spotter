// It will contain most of the logic for fetching the data from each API endpoint.
// Answer is provided at end with toggle https://web.compass.lighthouselabs.ca/days/w02d4/activities/895
const request = require('request');
/**
  * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
  * Input:
  *   - A callback with an error or results. 
  * Returns (via Callback):
  *   - An error, if any (nullable)
  *   - The fly-over times as an array (null if error):
  *     [ { risetime: <number>, duration: <number> }, ... ]
  */

const nextISSTimesForMyLocation = function(callback) { //you need them nesting cause if it returns error end but if not continue invoking others, since they are all calls, you need the ().
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, flyOverTimes) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, flyOverTimes)
      });
    });
  });
}
  /**
   * Makes a single API request to retrieve the user's IP address.
   * Input:
   *   - A callback (to pass back an error or the IP string)
   * Returns (via Callback):
   *   - An error, if any (nullable)
   *   - The IP address as a string (null if error). Example: "162.245.144.188"
   */
  const url = 'https://api.ipify.org?format=json';
  const fetchMyIP = function (callback) {
    request(url, (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null); // it creates a new Error object that we can pass around. In this case, we pass it back to the callback to indicate that something went wrong.
        return;
      }

      const data = JSON.parse(body);
      callback(null, data.ip);
      // console.log('data',data); //prints: data { ip: '142.59.163.201' }
      // console.log('body',body); //prints: body {"ip":"142.59.163.201"}

    });
  };


  const fetchCoordsByIP = function (IP, callback) {
    const geoAPI = `https://api.freegeoip.app/json/${IP}?apikey=84db5df0-53e7-11ec-92c7-edd4f1e9f563`;
    request(geoAPI, (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching Coordinates by IP: ${body}`;
        callback(Error(msg), null); // it creates a new Error object that we can pass around. In this case, we pass it back to the callback to indicate that something went wrong.
        return;
      }

      const { latitude, longitude } = JSON.parse(body); //check basics JS.js line 138 for notes on destructuring
      console.log(latitude, longitude)
      callback(null, { latitude, longitude });
    });
  };


  /**
   * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
   * Input:
   *   - An object with keys `latitude` and `longitude`
   *   - A callback (to pass back an error or the array of resulting data)
   * Returns (via Callback):
   *   - An error, if any (nullable)
   *   - The fly over times as an array of objects (null if error). Example:
   *     [ { risetime: 134564234, duration: 600 }, ... ]
   */


  const fetchISSFlyOverTimes = function (coords, callback) {
    const { latitude, longitude } = coords;
    const flyOverAPI = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
    request(flyOverAPI, (error, responses, body) => {
      if (error) {
        callback(error, null);
        return;
      }
      if (responses.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching fly over times by coordinates: ${body}`;
        callback(Error(msg), null); // it creates a new Error object that we can pass around. In this case, we pass it back to the callback to indicate that something went wrong.
        return;
      }

      const { response } = JSON.parse(body);
      callback(null, response);
    });
  };


  module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };