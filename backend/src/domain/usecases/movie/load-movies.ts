import { MovieModel } from "../../models/movie"
import { MovieRepository } from "../../repositories/movie-repository"

export class LoadMovies {
  private readonly movieRepository: MovieRepository

  constructor(movieRepository: MovieRepository) {
    this.movieRepository = movieRepository
  }

  async load(): Promise<MovieModel[]> {
    return this.movieRepository.loadAll()
  }
}
