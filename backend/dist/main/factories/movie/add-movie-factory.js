"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAddMovieController = exports.makeAddMovieValidation = void 0;
const add_movie_1 = require("../../../domain/usecases/movie/add-movie");
const movie_repository_1 = require("../../../infra/postgres/movie/movie-repository");
const add_movie_controller_1 = require("../../../presentation/controllers/movie/add-movie-controller");
const required_field_validation_1 = require("../../../presentation/validation/required-field-validation");
const makeAddMovieValidation = () => {
    const requiredFields = ['name', 'gender', 'duration', 'classification', 'releaseDate', 'synopsis'];
    const validations = requiredFields.map(field => new required_field_validation_1.RequiredFieldValidation(field));
    return {
        validate: (input) => {
            for (const validation of validations) {
                const error = validation.validate(input);
                if (error)
                    return error;
            }
        }
    };
};
exports.makeAddMovieValidation = makeAddMovieValidation;
const makeDbAddMovie = () => {
    const moviePgRepository = new movie_repository_1.PostgresMovieRepository();
    return new add_movie_1.AddMovie(moviePgRepository);
};
const makeAddMovieController = () => {
    const controller = new add_movie_controller_1.AddMovieController((0, exports.makeAddMovieValidation)(), makeDbAddMovie());
    return controller;
};
exports.makeAddMovieController = makeAddMovieController;
