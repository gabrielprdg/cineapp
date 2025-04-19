import { CinemaModel } from '../../../domain/models/cinema'
import { CinemaParams, CinemaRepository } from '../../../domain/repositories/cinema-repository'
import { pgHelper } from '../helper/postgres-helper'


export class PostgresCinemaRepository implements CinemaRepository {
  async create(data: CinemaParams): Promise<void> {
    console.log('vvvvvvvvvvv', data)
    const { name, city, state } = data
    await pgHelper.client.query(
      'INSERT INTO cinema (name, city, state) VALUES ($1, $2, $3)',
      [name, city, state]
    )
  }

  async loadAll(): Promise<CinemaModel[]> {
    const result = await pgHelper.client.query('SELECT * FROM cinema')
    return result.rows
  }

  async deleteById(id: string): Promise<CinemaModel | null> {
    const result = await pgHelper.client.query('DELETE FROM cinema WHERE id = $1', [id])
    if (result.rows.length > 0) {
      return result.rows[0];
    }
    return null;
  }

  async loadById(id: string): Promise<CinemaModel | null> {
    const result = await pgHelper.client.query(
      'SELECT * FROM cinema WHERE id = $1',
      [id]
    );

    if (result.rows.length > 0) {
      return result.rows[0];
    }

    return null;
  }

  async updateById(data: CinemaParams, id: string): Promise<void> {
    const { name, city, state } = data
    await pgHelper.client.query(
      'UPDATE cinema SET name = COALESCE($1, name), city = COALESCE($2, city), state = COALESCE($3, state) WHERE id = $4',
      [name, city, state, id]
    )
  }
} 