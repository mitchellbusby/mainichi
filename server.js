const Bundler = require("parcel-bundler");
const express = require("express");
const tfnsw = require('./TfNsw');

let bundler = new Bundler("index.html");
let app = express();

app.get('/buses', async (req, res) => {
  await tfnsw.getBusTimes();
  res.send('hello world');
})

app.use(bundler.middleware());

app.listen(3000)