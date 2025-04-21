import { SessionModel } from '../../../domain/models/session'
import { SessionParams, SessionRepository } from '../../../domain/repositories/session-repository'
import { pgHelper } from '../helper/postgres-helper'

export class PostgresSessionRepository implements SessionRepository {
  async create(session: SessionParams): Promise<string> {
    const { movie_id, cinema_id, day_of_week, date } = session
    const result = await pgHelper.pool.query(
      `
      INSERT INTO session (movie_id, cinema_id, day_of_week, date)
      VALUES ($1, $2, $3, $4)
      RETURNING id
      `,
      [movie_id, cinema_id, day_of_week, date]
    )
    return result.rows[0].id
  }

  async loadAll(): Promise<SessionModel[]> {
    const result = await pgHelper.pool.query('SELECT * FROM session')
    return result.rows
  }

  async loadById(id: string): Promise<SessionModel | null> {
    const result = await pgHelper.client.query(
      'SELECT * FROM session WHERE id = $1',
      [id]
    );

    if (result.rows.length > 0) {
      return result.rows[0];
    }

    return null;
  }

  async deleteById(id: string): Promise<SessionModel | null> {
    const result = await pgHelper.pool.query(
      'DELETE FROM session WHERE id = $1 RETURNING *',
      [id]
    )
    if (result.rows.length > 0) {
      return result.rows[0]
    }
    return null
  }

  async updateById(session: SessionParams, id: string): Promise<void> {
    const { movie_id, cinema_id, day_of_week, date } = session
    await pgHelper.pool.query(
      `
      UPDATE session SET
        movie_id = COALESCE($1, movie_id),
        cinema_id = COALESCE($2, cinema_id),
        day_of_week = COALESCE($3, day_of_week),
        date = COALESCE($4, date)
      WHERE id = $5
      `,
      [movie_id, cinema_id, day_of_week, date, id]
    )
  }
}
