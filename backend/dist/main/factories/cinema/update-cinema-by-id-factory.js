"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdateCinemaByIdController = void 0;
const update_cinema_by_id_1 = require("../../../domain/usecases/cinema/update-cinema-by-id");
const cinema_repository_1 = require("../../../infra/postgres/cinema/cinema-repository");
const update_cinema_by_id_controller_1 = require("../../../presentation/controllers/cinema/update-cinema-by-id-controller");
const makeDbUpdateCinemaById = () => {
    const cinemaRepo = new cinema_repository_1.PostgresCinemaRepository();
    return new update_cinema_by_id_1.UpdateCinemaById(cinemaRepo);
};
const makeUpdateCinemaByIdController = () => {
    return new update_cinema_by_id_controller_1.UpdateCinemaByIdController(makeDbUpdateCinemaById());
};
exports.makeUpdateCinemaByIdController = makeUpdateCinemaByIdController;
