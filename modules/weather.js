'use strict';
const axios = require('axios');
let cache = require('./cache');

class Weather {
  constructor(dayObj) {
    this.date = dayObj.datetime;
    this.forecast = 'A high of' + dayObj.high_temp + ', and a Low of';
    dayObj.low_temp + ' with' + dayObj.weather.description;
  }
}

function getWeather(latitude, longitude) {
  //const lat = req.query.lat;
  //const lon = req.query.lon;
  const key = 'weather-' + latitude + longitude;
  console.log('the WEATHER KEY', key);
  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&land=en&lat=${latitude}&lon=${longitude}&days=5`;

  if (cache[key] && Date.now() - cache[key].timestamp < 50000) {
    console.log('weather cache hit!', cache[key]);
    //response.status(200).send(cache[key].data);
  } else {
    console.log('missed weather cache!');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios
      .get(url)
      .then(weatherRes => parseWeatherData(weatherRes.data));
  }
  return cache[key].data;
}

function parseWeatherData(weatherRes) {
  try {
    const weatherForecastArray = weatherRes.data.map(forecast => {
      return new Weather(forecast);
    });
    console.log('here is your forecast', weatherForecastArray);
    return Promise.resolve(weatherForecastArray);
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = getWeather;
