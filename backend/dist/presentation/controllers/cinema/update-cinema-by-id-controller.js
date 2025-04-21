"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCinemaByIdController = void 0;
const http_helper_1 = require("../../helpers/http/http-helper");
class UpdateCinemaByIdController {
    constructor(updateCinemaById) {
        this.updateCinemaById = updateCinemaById;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = httpRequest.params;
                const { name, city, state } = httpRequest.body;
                yield this.updateCinemaById.update(id, {
                    name,
                    city,
                    state
                });
                return (0, http_helper_1.noContent)();
            }
            catch (err) {
                return (0, http_helper_1.serverError)(err);
            }
        });
    }
}
exports.UpdateCinemaByIdController = UpdateCinemaByIdController;
