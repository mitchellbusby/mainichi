const weather = require("../server/Weather");

const weatherHandler = (event, context, callback) => {
  weather.getWeatherForecast().then(result => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(result),
    });
  });
}

export {weatherHandler as handler};
