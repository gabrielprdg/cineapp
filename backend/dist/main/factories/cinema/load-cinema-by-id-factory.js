"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoadCinemaByIdController = void 0;
const load_cinema_by_id_1 = require("../../../domain/usecases/cinema/load-cinema-by-id");
const cinema_repository_1 = require("../../../infra/postgres/cinema/cinema-repository");
const load_cinema_by_id_controller_1 = require("../../../presentation/controllers/cinema/load-cinema-by-id-controller");
const makeDbLoadCinemaById = () => {
    const cinemaRepo = new cinema_repository_1.PostgresCinemaRepository();
    return new load_cinema_by_id_1.LoadCinemaById(cinemaRepo);
};
const makeLoadCinemaByIdController = () => {
    return new load_cinema_by_id_controller_1.LoadCinemaByIdController(makeDbLoadCinemaById());
};
exports.makeLoadCinemaByIdController = makeLoadCinemaByIdController;
