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
exports.PostgresMovieRepository = void 0;
const postgres_helper_1 = require("../helper/postgres-helper");
class PostgresMovieRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { gender, name, duration, classification, releaseDate, synopsis } = data;
            yield postgres_helper_1.pgHelper.pool.query('INSERT INTO movie (gender, name, duration, classification, release_date, synopsis) VALUES ($1, $2, $3,$4, $5, $6)', [gender, name, duration, classification, releaseDate, synopsis]);
        });
    }
    loadAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield postgres_helper_1.pgHelper.pool.query('SELECT * FROM movie');
            return result.rows;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield postgres_helper_1.pgHelper.pool.query('DELETE FROM movie WHERE id = $1', [id]);
            if (result.rows.length > 0) {
                return result.rows[0];
            }
            return null;
        });
    }
    updateById(data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { gender, name, duration, classification, releaseDate, synopsis } = data;
            yield postgres_helper_1.pgHelper.pool.query(`
      UPDATE movie SET
        name = COALESCE($1, name),
        gender = COALESCE($2, gender),
        duration = COALESCE($3, duration),
        classification = COALESCE($4, classification),
        release_date = COALESCE($5, release_date),
        synopsis = COALESCE($6, synopsis)
      WHERE id = $7
      `, [name, gender, duration, classification, releaseDate, synopsis, id]);
        });
    }
}
exports.PostgresMovieRepository = PostgresMovieRepository;
