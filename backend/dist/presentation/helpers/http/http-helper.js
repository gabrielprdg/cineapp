"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noContent = exports.ok = exports.serverError = exports.forbidden = exports.badRequest = void 0;
const server_error_1 = require("../../errors/server-error");
const badRequest = (error) => ({
    statusCode: 400,
    body: error
});
exports.badRequest = badRequest;
const forbidden = (error) => ({
    statusCode: 403,
    body: error
});
exports.forbidden = forbidden;
const serverError = (error) => ({
    statusCode: 500,
    body: new server_error_1.ServerError(error.stack)
});
exports.serverError = serverError;
const ok = (data) => ({
    statusCode: 200,
    body: data
});
exports.ok = ok;
const noContent = () => ({
    statusCode: 204,
    body: null
});
exports.noContent = noContent;
