import { MovieParams, MovieRepository } from "../../repositories/movie-repository"

export class AddMovie {
  private readonly movieRepository: MovieRepository

  constructor(movieRepository: MovieRepository) {
    this.movieRepository = movieRepository
  }

  async add(data: MovieParams): Promise<void> {
    await this.movieRepository.create(data)
  }
}