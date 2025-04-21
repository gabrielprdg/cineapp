"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAddSessionController = exports.makeAddSessionValidation = void 0;
const add_session_1 = require("../../../domain/usecases/session/add-session");
const session_repository_1 = require("../../../infra/postgres/session/session-repository");
const add_session_controller_1 = require("../../../presentation/controllers/session/add-session-controller");
const required_field_validation_1 = require("../../../presentation/validation/required-field-validation");
const makeAddSessionValidation = () => {
    const requiredFields = ['movie_id', 'cinema_id', 'day_of_week', 'date'];
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
exports.makeAddSessionValidation = makeAddSessionValidation;
const makeDbAddSession = () => {
    const sessionPgRepository = new session_repository_1.PostgresSessionRepository();
    return new add_session_1.AddSession(sessionPgRepository);
};
const makeAddSessionController = () => {
    return new add_session_controller_1.AddSessionController((0, exports.makeAddSessionValidation)(), makeDbAddSession());
};
exports.makeAddSessionController = makeAddSessionController;
