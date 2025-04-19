"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdateSessionByIdController = void 0;
const update_session_by_id_1 = require("../../../domain/usecases/session/update-session-by-id");
const session_repository_1 = require("../../../infra/postgres/session/session-repository");
const update_session_by_id_controller_1 = require("../../../presentation/controllers/session/update-session-by-id-controller");
const makeDbUpdateSessionById = () => {
    const sessionRepo = new session_repository_1.PostgresSessionRepository();
    return new update_session_by_id_1.UpdateSessionById(sessionRepo);
};
const makeUpdateSessionByIdController = () => {
    return new update_session_by_id_controller_1.UpdateSessionByIdController(makeDbUpdateSessionById());
};
exports.makeUpdateSessionByIdController = makeUpdateSessionByIdController;
