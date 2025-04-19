"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoadSessionByIdController = void 0;
const load_session_by_id_1 = require("../../../domain/usecases/session/load-session-by-id");
const session_repository_1 = require("../../../infra/postgres/session/session-repository");
const load_session_by_id_controller_1 = require("../../../presentation/controllers/session/load-session-by-id-controller");
const makeDbLoadSessionById = () => {
    const sessionRepo = new session_repository_1.PostgresSessionRepository();
    return new load_session_by_id_1.LoadSessionById(sessionRepo);
};
const makeLoadSessionByIdController = () => {
    return new load_session_by_id_controller_1.LoadSessionByIdController(makeDbLoadSessionById());
};
exports.makeLoadSessionByIdController = makeLoadSessionByIdController;
