/**
 * Server that acts like my netlify deploy 🤷
 */

require("dotenv").config();
const Bundler = require("parcel-bundler");
const express = require("express");
const tfnsw = require('./server/TfNsw');
const weather = require('./server/Weather');

let bundler = new Bundler("index.html");
let app = express();

app.get('/.netlify/functions/buses', async (req, res) => {
  const response = await tfnsw.getBusTimesFromJake();
  res.send(response);
});

app.get("/.netlify/functions/weather", async (req, res) => {
  const response = await weather.getWeatherForecast();
  res.send(response);
});

app.use(bundler.middleware());

app.listen(3000)