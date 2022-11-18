const axios = require('axios');

async function getWeather(req, res, next) {
    try {
        let latitude = req.query.queriedLat
        let longitude = req.query.queriedlon
        let weatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${process.env.WEATHER_API_KEY}&units=I&days=3`);
        let forecast = weatherData.data.data.map(obj => new forecast(obj));
        res.send(forecast);
    }
    catch (error) {
        Promise.resolve().then(() => {
            throw new Error(error.message);
        }).catch(next);
    }
}
class Forecast {
    constructor(obj) {
        this.date = obj.datetime;
        this.description = obj.weather.description;
        this.max_temp = obj.max_temp;
        this.min_temp = obj.min_temp;
        this.precip = obj.precip;
    }
}
module.exports = getWeather;