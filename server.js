'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const weather = require('./modules/weather.js');
const movies = require('./modules/movies.js');

const app = express();
app.use(cors());

const PORT = process.env.PORT;

app.get('/weather', forecastHandler);
app.get('/movies', moviesHandler);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

// app.get('/', (request, response) => {
//   response.status(200).send('home');
// });

function forecastHandler(request, response) {
  const { lat, lon } = request.query;
  // console.log('found the weather', lat, lon);
  weather(lat, lon)
    .then(weatherSummary => response.send(weatherSummary))
    .catch(error => {
      console.error(error);
      response.status(500).send('error, server is broken');
    });
}

function moviesHandler(request, response) {
  const location = request.query.location;
  console.log('found the movies', location);
  movies(location)
    .then(movieSummary => response.send(movieSummary))
    .catch(error => {
      console.error(error);
      response.status(500).send('error, server is broken');
    });
}

//create a basic default route
//app,get() takes in a paramater or a url in quotes and callback function

//error
//handle any errors
// app.use((error, req, res, next) => {
//   res.status(500).send(error.message);
// });

//listen
//start the server

// listen is an express method

//REQUIRE
//in our servers we have to use require instead of import
//here we will list the requirments for a server
//we need to bring in our env file

//once we have required something we have to use it
//here is where we will assign the rewuired file a variable
//react does this in one step with import = express takes 2 steps: require and use
