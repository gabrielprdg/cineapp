"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoadMoviesController = void 0;
const load_movies_1 = require("../../../domain/usecases/movie/load-movies");
const movie_repository_1 = require("../../../infra/postgres/movie/movie-repository");
const load_movies_controller_1 = require("../../../presentation/controllers/movie/load-movies-controller");
const makeDbLoadMovies = () => {
    const movieRepo = new movie_repository_1.PostgresMovieRepository();
    return new load_movies_1.LoadMovies(movieRepo);
};
const makeLoadMoviesController = () => {
    return new load_movies_controller_1.LoadMoviesController(makeDbLoadMovies());
};
exports.makeLoadMoviesController = makeLoadMoviesController;
