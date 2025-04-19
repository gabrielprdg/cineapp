"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_route_adapter_1 = require("../adapters/express-route-adapter");
const add_cinema_factory_1 = require("../factories/cinema/add-cinema-factory");
const load_cinemas_factory_1 = require("../factories/cinema/load-cinemas-factory");
const update_cinema_by_id_factory_1 = require("../factories/cinema/update-cinema-by-id-factory");
const delete_cinema_by_id_factory_1 = require("../factories/cinema/delete-cinema-by-id-factory");
const load_cinema_by_id_factory_1 = require("../factories/cinema/load-cinema-by-id-factory");
exports.default = (router) => {
    router.post('/v1/cinema', (0, express_route_adapter_1.adaptRoute)((0, add_cinema_factory_1.makeAddCinemaController)()));
    router.get('/v1/cinemas', (0, express_route_adapter_1.adaptRoute)((0, load_cinemas_factory_1.makeLoadCinemasController)()));
    router.get('/v1/cinema/:id', (0, express_route_adapter_1.adaptRoute)((0, load_cinema_by_id_factory_1.makeLoadCinemaByIdController)()));
    router.put('/v1/cinema/:id', (0, express_route_adapter_1.adaptRoute)((0, update_cinema_by_id_factory_1.makeUpdateCinemaByIdController)()));
    router.delete('/v1/cinema', (0, express_route_adapter_1.adaptRoute)((0, delete_cinema_by_id_factory_1.makeDeleteCinemaByIdController)()));
};
