"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_route_adapter_1 = require("../adapters/express-route-adapter");
const add_session_factory_1 = require("../factories/session/add-session-factory");
const delete_session_by_id_factory_1 = require("../factories/session/delete-session-by-id-factory");
const load_sessions_factory_1 = require("../factories/session/load-sessions-factory");
const update_session_by_id_factory_1 = require("../factories/session/update-session-by-id-factory");
const load_session_by_id_factory_1 = require("../factories/session/load-session-by-id-factory");
exports.default = (router) => {
    router.post('/v1/session', (0, express_route_adapter_1.adaptRoute)((0, add_session_factory_1.makeAddSessionController)()));
    router.get('/v1/sessions', (0, express_route_adapter_1.adaptRoute)((0, load_sessions_factory_1.makeLoadSessionsController)()));
    router.get('/v1/session/:id', (0, express_route_adapter_1.adaptRoute)((0, load_session_by_id_factory_1.makeLoadSessionByIdController)()));
    router.put('/v1/session/:id', (0, express_route_adapter_1.adaptRoute)((0, update_session_by_id_factory_1.makeUpdateSessionByIdController)()));
    router.delete('/v1/session', (0, express_route_adapter_1.adaptRoute)((0, delete_session_by_id_factory_1.makeDeleteSessionByIdController)()));
};
