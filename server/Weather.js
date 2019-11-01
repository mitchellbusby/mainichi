require("isomorphic-fetch");

const apiKey = process.env.WEATHERBIT_API_KEY;

const fetchUrl = `https://api.weatherbit.io/v2.0/forecast/hourly?city=Lilyfield&country=Australia&key=${apiKey}&hours=18`;

/**
 * Gets an hourly weather forecast for local area
 */
const getWeatherForecast = async () => {
  const response = await fetch(fetchUrl);

  const json = await response.json();
  
  return json;
}

module.exports = {
  getWeatherForecast,
}