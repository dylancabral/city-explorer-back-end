
const axios = require('axios');
let cache = require('./cache');



function getMovies(location) {
  console.log('going to the Movies')
  const key = 'movies-' + location;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${location}&language=en-US&page=1`;

  if (!cache[key] && Date.now() -cache[key].timestamp < 50000) {
    console.log('movie cache hit');
  }else{
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios
    .get(url)
    .then(movieRes => parseMoviesData(movieRes.data));
  }
  console.log('movie cache', cache);
  return cache[key].data;
}

function parseMoviesData(movieRes) {

  try {
    const moviesArray = movieRes.results.map(movie => {
      return new Movie(movie);
    });
    return Promise.resolve(moviesArray);
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
  constructor(movieObj) {
    this.title = movieObj.title;
    this.imageUrl = `https://image.tmdb.org/t/p/w500${movieObj.poster_path}`;
    this.overview = movieObj.overview;
    this.release_date = movieObj.release_date;
  }
}
module.exports = getMovies;
