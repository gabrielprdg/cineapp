import { MovieRepository, MovieParams } from "../../repositories/movie-repository"

export class UpdateMovieById {
  private readonly movieRepository: MovieRepository

  constructor(movieRepository: MovieRepository) {
    this.movieRepository = movieRepository
  }

  async update(id: string, data: Partial<MovieParams>): Promise<void> {
    await this.movieRepository.updateById(data, id)
  }
}
