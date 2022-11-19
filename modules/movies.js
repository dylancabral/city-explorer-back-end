
const axios = require('axios');
let cache = require('./cache');
module.exports = getMovies;


function getMovies(location) {
  const key = 'movies-' + location;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${location}`;

  if (!cache[key]) {
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(data => parseMoviesData(data.data));
  }
  return cache[key].data;
}
function parseMoviesData(data) {


  try {
    const movies = data.results.map(movie => {
      return new Movie(movie);
    });
    return Promise.resolve(movies);
  } catch (e) {
    return Promise.reject(e);
  }
}
/*
    let cityMovie = request.query.queriedMovie;
    let filmData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityMovie}`);
    let displayedFilms = filmData.data.results.map(movie => new Movies(movie));
    response.send(displayedFilms);
  }
  catch (error) {
    Promise.resolve().then(() => {
      throw new Error(error.message);
    }).catch(next);
  }
};
*/
class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.imageUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    this.overview = movie.overview;
    this.release_date = movie.release_date;
  }
}

