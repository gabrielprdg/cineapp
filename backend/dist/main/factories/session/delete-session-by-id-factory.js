"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeleteSessionByIdController = void 0;
const delete_session_by_id_1 = require("../../../domain/usecases/session/delete-session-by-id");
const session_repository_1 = require("../../../infra/postgres/session/session-repository");
const delete_session_by_id_controller_1 = require("../../../presentation/controllers/session/delete-session-by-id-controller");
const makeDbDeleteSessionById = () => {
    const sessionRepo = new session_repository_1.PostgresSessionRepository();
    return new delete_session_by_id_1.DeleteSessionById(sessionRepo);
};
const makeDeleteSessionByIdController = () => {
    return new delete_session_by_id_controller_1.DeleteSessionByIdController(makeDbDeleteSessionById());
};
exports.makeDeleteSessionByIdController = makeDeleteSessionByIdController;
