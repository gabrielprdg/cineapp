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
exports.PostgresSessionRepository = void 0;
const postgres_helper_1 = require("../helper/postgres-helper");
class PostgresSessionRepository {
    create(session) {
        return __awaiter(this, void 0, void 0, function* () {
            const { movieId, cinemaId, dayOfWeek, date } = session;
            const result = yield postgres_helper_1.pgHelper.pool.query(`
      INSERT INTO session (movie_id, cinema_id, day_of_week, date)
      VALUES ($1, $2, $3, $4)
      RETURNING id
      `, [movieId, cinemaId, dayOfWeek, date]);
            return result.rows[0].id;
        });
    }
    loadAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield postgres_helper_1.pgHelper.pool.query('SELECT * FROM session');
            return result.rows;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield postgres_helper_1.pgHelper.pool.query('DELETE FROM session WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length > 0) {
                return result.rows[0];
            }
            return null;
        });
    }
    updateById(session, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { movieId, cinemaId, dayOfWeek, date } = session;
            yield postgres_helper_1.pgHelper.pool.query(`
      UPDATE session SET
        movie_id = COALESCE($1, movie_id),
        cinema_id = COALESCE($2, cinema_id),
        day_of_week = COALESCE($3, day_of_week),
        date = COALESCE($4, date)
      WHERE id = $5
      `, [movieId, cinemaId, dayOfWeek, date, id]);
        });
    }
}
exports.PostgresSessionRepository = PostgresSessionRepository;
