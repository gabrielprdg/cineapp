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
exports.AddSessionController = void 0;
const http_helper_1 = require("../../helpers/http/http-helper");
class AddSessionController {
    constructor(validation, addSession) {
        this.validation = validation;
        this.addSession = addSession;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const error = this.validation.validate(httpRequest.body);
                if (error) {
                    return (0, http_helper_1.badRequest)(error);
                }
                const { movieId, cinemaId, dayOfWeek, date } = httpRequest.body;
                // Converte a string para objeto Date
                const parsedDate = new Date(date);
                // Ajusta para o horário local de São Paulo (GMT-3)
                const localDate = new Date(parsedDate.getTime() + (3 * 60 * 60 * 1000));
                yield this.addSession.add({
                    movieId,
                    cinemaId,
                    dayOfWeek,
                    date: localDate
                });
                return (0, http_helper_1.noContent)();
            }
            catch (err) {
                console.log('eeeeee', err);
                return (0, http_helper_1.serverError)(err);
            }
        });
    }
}
exports.AddSessionController = AddSessionController;
