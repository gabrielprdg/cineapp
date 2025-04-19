import { MovieModel } from '../models/movie'

export type MovieParams = {
  gender?: string
  name?: string
  duration?: number
  classification?: string
  releaseDate?: Date
  synopsis?: string
}

export abstract class MovieRepository {
  abstract create(movie: MovieParams): Promise<void>;
  abstract deleteById(id: string): Promise<MovieModel | null>;
  abstract loadAll(): Promise<MovieModel[]>;
  abstract updateById(movie: MovieParams, id: string): Promise<void>;
}