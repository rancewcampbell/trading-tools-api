const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

app.get(
  '/api/v1/stocks/percent-above/ticker=:ticker&percent=:percent&time=:time',
  (req, res) => {
    const { ticker, percent, time } = req.params;
    console.log(ticker);
    console.log(percent);
    console.log(time);
    const today = Math.floor(Date.now() / 1000);
    const URL = `https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=D&from=${time}&to=${today}&token=${API_KEY}`;
    axios
      .get(URL)
      .then((response) => {
        console.log(response.data);
        res.send(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});