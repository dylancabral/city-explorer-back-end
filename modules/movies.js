'use strict';

const axios = require('axios');
let cache = require('./cache');

class Movie {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.imageUrl = `https://image.tmdb.org/t/p/w500${movieObj.poster_path}`;
    this.overview = movieObj.overview;
    this.release_date = movieObj.release_date;
    this.popularity = movieObj.popularity;
    this.timestamp = Date.now();
  }
}

function getMovies(location) {
  console.log('going to the Movies');
  const key = 'movies-' + location;
  console.log('this is the MOVIE key', key);
  //const searchedCity = req.query.searchedCity;
  const url = `http://api.themoviedb.org/3/search/movie/?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&query=${location}`;
  console.log('movie cache hit');

  if (!cache[key]) {
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios
      .get(url)
      .then(movieRes => parseMoviesData(movieRes.data));
  }
  console.log('movie cache', cache[key].data);
  return cache[key].data;
}
//console.log('Movie cache missed!');
//response.status(200).send(cache[key].data);

function parseMoviesData(movieRes) {
  try {
    const moviesArray = movieRes.results.map(movie => {
      return new Movie(movie);
    });
    // console.log('movies!', moviesArray);
    return Promise.resolve(moviesArray);
  } catch (e) {
    return Promise.reject(e);
  }
}

module.exports = getMovies;
