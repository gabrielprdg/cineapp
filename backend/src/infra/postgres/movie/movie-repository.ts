import { MovieModel } from '../../../domain/models/movie'
import { MovieParams, MovieRepository } from '../../../domain/repositories/movie-repository'
import { pgHelper } from '../helper/postgres-helper'

export class PostgresMovieRepository implements MovieRepository {
  async create(data: MovieParams): Promise<void> {
    const { gender, name, duration, classification, release_date, synopsis } = data
    await pgHelper.pool.query(
      'INSERT INTO movie (gender, name, duration, classification, release_date, synopsis) VALUES ($1, $2, $3,$4, $5, $6)',
      [gender, name, duration, classification, release_date, synopsis]
    )
  }

  async loadAll(): Promise<MovieModel[]> {
    const result = await pgHelper.pool.query('SELECT * FROM movie')
    return result.rows
  }

  async deleteById(id: string): Promise<MovieModel | null> {
    const result = await pgHelper.pool.query('DELETE FROM movie WHERE id = $1', [id])
    if (result.rows.length > 0) {
      return result.rows[0];
    }
    return null;
  }

  async loadById(id: string): Promise<MovieModel | null> {
    const result = await pgHelper.client.query(
      'SELECT * FROM movie WHERE id = $1',
      [id]
    );

    if (result.rows.length > 0) {
      return result.rows[0];
    }

    return null;
  }

  async updateById(data: MovieParams, id: string): Promise<void> {
    const { gender, name, duration, classification, release_date, synopsis } = data
    await pgHelper.pool.query(
      `
      UPDATE movie SET
        name = COALESCE($1, name),
        gender = COALESCE($2, gender),
        duration = COALESCE($3, duration),
        classification = COALESCE($4, classification),
        release_date = COALESCE($5, release_date),
        synopsis = COALESCE($6, synopsis)
      WHERE id = $7
      `,
      [name, gender, duration, classification, release_date, synopsis, id]
    );
  }
} 