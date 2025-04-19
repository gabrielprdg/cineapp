"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoadMovieByIdController = void 0;
const load_movie_by_id_1 = require("../../../domain/usecases/movie/load-movie-by-id");
const movie_repository_1 = require("../../../infra/postgres/movie/movie-repository");
const load_movie_by_id_controller_1 = require("../../../presentation/controllers/movie/load-movie-by-id-controller");
const makeDbLoadMovieById = () => {
    const movieRepo = new movie_repository_1.PostgresMovieRepository();
    return new load_movie_by_id_1.LoadMovieById(movieRepo);
};
const makeLoadMovieByIdController = () => {
    return new load_movie_by_id_controller_1.LoadMovieByIdController(makeDbLoadMovieById());
};
exports.makeLoadMovieByIdController = makeLoadMovieByIdController;
