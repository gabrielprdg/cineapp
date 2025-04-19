"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoadSessionsController = void 0;
const load_sessions_1 = require("../../../domain/usecases/session/load-sessions");
const session_repository_1 = require("../../../infra/postgres/session/session-repository");
const load_sessions_controller_1 = require("../../../presentation/controllers/session/load-sessions-controller");
const makeDbLoadSessions = () => {
    const sessionRepo = new session_repository_1.PostgresSessionRepository();
    return new load_sessions_1.LoadSessions(sessionRepo);
};
const makeLoadSessionsController = () => {
    return new load_sessions_controller_1.LoadSessionsController(makeDbLoadSessions());
};
exports.makeLoadSessionsController = makeLoadSessionsController;
