'use strict';
const axios = require('axios');
let cache = require('./cache');
module.exports = getForecast;


function getForecast(lat,lon) {
  const key = 'weather-' + lat + lon ;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily/?days=3&units=I&land=en&lat=${lat}&lon${lon}&key=${process.env.WEATHER_API_KEY}`;

  if (!cache[key] && Date.now() - cache[key].timestamp < 50000) {
    console.log('weather cache hit!', cache[key]);
  } else{
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios
    .get(url)
    .then(weatherRes => parseWeatherData(weatherRes.data));
  }
  return cache[key].data;
}

function parseWeatherData(weatherData) {
  try {
    const weatherForecastArray = weatherRes.data.map(forecast => {
      return new Weather(forecast);
    });
    return Promise.resolve(weatherForecastArray);
  } catch (error) {
    return Promise.reject(error);
  }
}
class Weather {
  constructor(dayObj) {
    this.date = dayObj.datetime;
    this.description = 
    'A high of' + 
    dayObj.high_temp +
    ', and a Low of'
    dayObj.low_temp +
    ' with' +
    dayObj.forecast.description.toLowerCase();
    // this.max_temp = dayObj.max_temp;
    // this.min_temp = dayObj.min_temp;
    // this.precip = dayObj.precip;
    // this.timestamp = Date.now();
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

