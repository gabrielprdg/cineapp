"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAddCinemaController = exports.makeAddCinemaValidation = void 0;
const add_cinema_1 = require("../../../domain/usecases/cinema/add-cinema");
const cinema_repository_1 = require("../../../infra/postgres/cinema/cinema-repository");
const add_cinema_controller_1 = require("../../../presentation/controllers/cinema/add-cinema-controller");
const required_field_validation_1 = require("../../../presentation/validation/required-field-validation");
const makeAddCinemaValidation = () => {
    const requiredFields = ['name', 'city', 'state'];
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
exports.makeAddCinemaValidation = makeAddCinemaValidation;
const makeDbAddCinema = () => {
    const CinemaPgRepository = new cinema_repository_1.PostgresCinemaRepository();
    console.log('gnnnnnnnnnnnnnnn');
    return new add_cinema_1.AddCinema(CinemaPgRepository);
};
const makeAddCinemaController = () => {
    console.log('ssssssssssss');
    const controller = new add_cinema_controller_1.AddCinemaController((0, exports.makeAddCinemaValidation)(), makeDbAddCinema());
    return controller;
};
exports.makeAddCinemaController = makeAddCinemaController;
