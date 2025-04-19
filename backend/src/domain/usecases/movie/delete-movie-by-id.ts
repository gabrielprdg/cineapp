import { MovieRepository } from "../../repositories/movie-repository"

export class DeleteMovieById {
  private readonly movieRepository: MovieRepository

  constructor(movieRepository: MovieRepository) {
    this.movieRepository = movieRepository
  }

  async delete(id: string): Promise<void> {
    await this.movieRepository.deleteById(id)
  }
}
