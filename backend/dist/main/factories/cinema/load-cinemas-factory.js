"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoadCinemasController = void 0;
const load_cinemas_controller_1 = require("../../../presentation/controllers/cinema/load-cinemas-controller");
const cinema_repository_1 = require("../../../infra/postgres/cinema/cinema-repository");
const load_cinemas_1 = require("../../../domain/usecases/cinema/load-cinemas");
const makeDbLoadCinemas = () => {
    const cinemaRepo = new cinema_repository_1.PostgresCinemaRepository();
    return new load_cinemas_1.LoadCinemas(cinemaRepo);
};
const makeLoadCinemasController = () => {
    return new load_cinemas_controller_1.LoadCinemasController(makeDbLoadCinemas());
};
exports.makeLoadCinemasController = makeLoadCinemasController;
