import { CinemaModel } from '../models/cinema'

export type CinemaParams = {
  name: string
  city: string
  state: string
}


export abstract class CinemaRepository {
  abstract create(cinema: CinemaParams): Promise<void>;
  abstract deleteById(id: string): Promise<CinemaModel | null>;
  abstract loadAll(): Promise<CinemaModel[]>;
  abstract updateById(cinema: CinemaParams, id: string): Promise<void>;
}