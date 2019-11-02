/**
 * Server that acts like my netlify deploy 🤷
 * but with filesystem caching :D
 */

require("dotenv").config();
const Bundler = require("parcel-bundler");
const express = require("express");
const tfnsw = require('./server/TfNsw');
const weather = require('./server/Weather');
const flatCache = require('flat-cache');

const cache = flatCache.load('mainichi');
const CacheKeys = {
  Weather: 'weather'
}

let bundler = new Bundler("index.html");
let app = express();

app.get('/.netlify/functions/buses', async (req, res) => {
  const response = await tfnsw.getBusTimesFromJake();
  res.send(response);
});

app.get("/.netlify/functions/weather", async (req, res) => {
  const cachedResponse = cache.getKey(CacheKeys.Weather);
  if (cachedResponse) {
    console.log("Used cache result for weather");
    res.send(cachedResponse);
    return;
  }

  const response = await weather.getWeatherForecast();

  cache.setKey(CacheKeys.Weather, response);
  res.send(response);
});

app.get('/clearcache', () => {
  cache.removeKey(CacheKeys.Weather);
})

app.use(bundler.middleware());

app.listen(3000)