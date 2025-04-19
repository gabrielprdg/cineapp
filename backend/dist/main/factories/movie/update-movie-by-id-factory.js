"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdateMovieByIdController = void 0;
const update_movie_by_id_1 = require("../../../domain/usecases/movie/update-movie-by-id");
const movie_repository_1 = require("../../../infra/postgres/movie/movie-repository");
const update_movie_by_id_controller_1 = require("../../../presentation/controllers/movie/update-movie-by-id-controller");
const makeDbUpdateMovieById = () => {
    const movieRepo = new movie_repository_1.PostgresMovieRepository();
    return new update_movie_by_id_1.UpdateMovieById(movieRepo);
};
const makeUpdateMovieByIdController = () => {
    return new update_movie_by_id_controller_1.UpdateMovieByIdController(makeDbUpdateMovieById());
};
exports.makeUpdateMovieByIdController = makeUpdateMovieByIdController;
