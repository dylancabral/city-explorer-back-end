
const axios = require('axios');

let getMovies = async (request, response, next) => {
    try {
        let cityMovie = request.query.queriedMovie
        let filmData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityMovie}`);
        let displayedFilms = filmData.data.results.map(obj => new Movies(obj));
        response.send(displayedFilms);
    }
    catch (error) {
        Promise.resolve().then(() => {
            throw new Error(error.message);
        }).catch(next);
    }
}
class Movies {
    constructor(obj) {
        this.title = obj.title;
        this.overview = obj.overview;
        this.release_date = obj.release_date;
    
    }
}

module.exports = getMovies;