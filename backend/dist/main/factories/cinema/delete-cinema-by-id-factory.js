"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeleteCinemaByIdController = void 0;
const delete_cinema_by_id_1 = require("../../../domain/usecases/cinema/delete-cinema-by-id");
const cinema_repository_1 = require("../../../infra/postgres/cinema/cinema-repository");
const delete_cinema_by_id_controller_1 = require("../../../presentation/controllers/cinema/delete-cinema-by-id-controller");
const makeDbDeleteCinemaById = () => {
    const cinemaRepo = new cinema_repository_1.PostgresCinemaRepository();
    return new delete_cinema_by_id_1.DeleteCinemaById(cinemaRepo);
};
const makeDeleteCinemaByIdController = () => {
    return new delete_cinema_by_id_controller_1.DeleteCinemaByIdController(makeDbDeleteCinemaById());
};
exports.makeDeleteCinemaByIdController = makeDeleteCinemaByIdController;
