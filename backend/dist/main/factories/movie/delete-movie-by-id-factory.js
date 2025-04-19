"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeleteMovieByIdController = void 0;
const delete_movie_by_id_1 = require("../../../domain/usecases/movie/delete-movie-by-id");
const movie_repository_1 = require("../../../infra/postgres/movie/movie-repository");
const delete_movie_by_id_controller_1 = require("../../../presentation/controllers/movie/delete-movie-by-id-controller");
const makeDbDeleteMovieById = () => {
    const movieRepo = new movie_repository_1.PostgresMovieRepository();
    return new delete_movie_by_id_1.DeleteMovieById(movieRepo);
};
const makeDeleteMovieByIdController = () => {
    return new delete_movie_by_id_controller_1.DeleteMovieByIdController(makeDbDeleteMovieById());
};
exports.makeDeleteMovieByIdController = makeDeleteMovieByIdController;
