const Bundler = require("parcel-bundler");
const express = require("express");
const tfnsw = require('./server/TfNsw');

let bundler = new Bundler("index.html");
let app = express();

app.get('/buses', async (req, res) => {
  const response = await tfnsw.getBusTimesFromJake();
  res.send(response);
});

app.use(bundler.middleware());

app.listen(3000)