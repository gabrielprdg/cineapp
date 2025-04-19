"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_route_adapter_1 = require("../adapters/express-route-adapter");
const add_movie_factory_1 = require("../factories/movie/add-movie-factory");
const delete_movie_by_id_factory_1 = require("../factories/movie/delete-movie-by-id-factory");
const load_movies_factory_1 = require("../factories/movie/load-movies-factory");
const update_movie_by_id_factory_1 = require("../factories/movie/update-movie-by-id-factory");
const load_movie_by_id_factory_1 = require("../factories/movie/load-movie-by-id-factory");
exports.default = (router) => {
    router.post('/v1/movie', (0, express_route_adapter_1.adaptRoute)((0, add_movie_factory_1.makeAddMovieController)()));
    router.get('/v1/movies', (0, express_route_adapter_1.adaptRoute)((0, load_movies_factory_1.makeLoadMoviesController)()));
    router.get('/v1/movie/:id', (0, express_route_adapter_1.adaptRoute)((0, load_movie_by_id_factory_1.makeLoadMovieByIdController)()));
    router.put('/v1/movie:id', (0, express_route_adapter_1.adaptRoute)((0, update_movie_by_id_factory_1.makeUpdateMovieByIdController)()));
    router.delete('/v1/movie', (0, express_route_adapter_1.adaptRoute)((0, delete_movie_by_id_factory_1.makeDeleteMovieByIdController)()));
};
