'use strict';
require('dotenv').config();
console.log('our first server');


//REQUIRE
//in our servers we have to use require instead of import
//here we will list the requirments for a server
const express = require('express');
const cors = require('cors');
const weather = require('./modules/weather.js');
const movie = require('./modules/movies.js');



//we need to bring in our env file


//once we have required something we have to use it
//here is where we will assign the rewuired file a variable
//react does this in one step with import = express takes 2 steps: require and use
const app = express();
app.use(cors());

//define the port and validate env file working 
const PORT = process.env.PORT || 3002;

//ROUTES
//this is where we will write handlers for our endpoints 
app.get('/', (request, response) => {
  response.status(200).send('home');
});

app.get('/weather', getForecast);

app.get('/movies', getMovies);

// app.get('*', (request, response) => {
//   response.status(404).send('error');
// });

function getForecast(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
    .then(weatherSummary => response.send(weatherSummary))
    .catch((error) => {
      console.error(error);
      response.status(500).send('error, server is broken');
    });
}

function getMovies(request, response) {
  const location = request.query.location;
  movie(location)
    .then(movieSummary => response.send(movieSummary))
    .catch(error => {
      console.error(error);
      response.status(500).send('error, server is broken');
    });
}

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
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
