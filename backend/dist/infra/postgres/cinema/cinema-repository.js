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
exports.PostgresCinemaRepository = void 0;
const postgres_helper_1 = require("../helper/postgres-helper");
class PostgresCinemaRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('vvvvvvvvvvv', data);
            const { name, city, state } = data;
            yield postgres_helper_1.pgHelper.client.query('INSERT INTO cinema (name, city, state) VALUES ($1, $2, $3)', [name, city, state]);
        });
    }
    loadAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield postgres_helper_1.pgHelper.client.query('SELECT * FROM cinema');
            return result.rows;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield postgres_helper_1.pgHelper.client.query('DELETE FROM cinema WHERE id = $1', [id]);
            if (result.rows.length > 0) {
                return result.rows[0];
            }
            return null;
        });
    }
    updateById(data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, city, state } = data;
            yield postgres_helper_1.pgHelper.client.query('UPDATE cinema SET name = COALESCE($1, name), city = COALESCE($2, city), state = COALESCE($3, state) WHERE id = $4', [name, city, state, id]);
        });
    }
}
exports.PostgresCinemaRepository = PostgresCinemaRepository;
