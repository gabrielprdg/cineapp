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
exports.UpdateSessionByIdController = void 0;
const http_helper_1 = require("../../helpers/http/http-helper");
class UpdateSessionByIdController {
    constructor(updateSessionById) {
        this.updateSessionById = updateSessionById;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = httpRequest.params;
                const { movieId, cinemaId, dayOfWeek, date } = httpRequest.body;
                yield this.updateSessionById.update(id, {
                    movieId,
                    cinemaId,
                    dayOfWeek,
                    date
                });
                return (0, http_helper_1.noContent)();
            }
            catch (err) {
                return (0, http_helper_1.serverError)(err);
            }
        });
    }
}
exports.UpdateSessionByIdController = UpdateSessionByIdController;
