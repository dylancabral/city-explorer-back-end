'use strict';
const axios = require('axios');
let cache = require('./cache');
module.exports = getWeather;


function getWeather(latitude,longitude) {
  const key = 'weather-' + latitude + longitude ;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&land=en&lat=${latitude}&lon={longitude}&days=3`;

  if (!cache[key]) {
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(response => parseWeatherData(response.data));
  }
  return cache[key].data;
}
function parseWeatherData(weatherData) {


  try {
    const weather = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weather);
  } catch (e) {
    return Promise.reject(e);
  }
}
class Weather {
  constructor(day) {
    this.date = day.datetime;
    this.description = day.weather.description;
    this.max_temp = day.max_temp;
    this.min_temp = day.min_temp;
    this.precip = day.precip;
    this.timestamp = Date.now();
  }
}
// async function getWeather(req, res, next) {
//   try {
//     let latitude = req.query.queriedLat
//     let longitude = req.query.queriedLon
//     console.log(latitude, longitude);
//     let weatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${process.env.WEATHER_API_KEY}&units=I&days=3`);
//     console.log(weatherData.data);
//     let forecast = weatherData.data.data.map(obj => new Forecast(obj));
//     res.send(forecast);
//   }
//   catch (error) {
//     Promise.resolve().then(() => {
//       throw new Error(error.message);
//     }).catch(next);
//   }
// }
// class Forecast {
//   constructor(obj) {
//     this.date = obj.datetime;
//     this.description = obj.weather.description;
//     this.max_temp = obj.max_temp;
//     this.min_temp = obj.min_temp;
//     this.precip = obj.precip;
//   }
// }

