
require('isomorphic-fetch');

const fetchUrl = "https://sydney-bus-departures.herokuapp.com/v1/departures?stop=204068";

/**
 * Gets bus times for the 470 from my bus stop; makes use of a public API.
 */
const getBusTimesFromJake = async () => {
  // Uses a public API
  const response = await fetch(fetchUrl);

  const json = await response.json();

  return json;
}

module.exports = {
  getBusTimes,
  getBusTimesFromJake,
}