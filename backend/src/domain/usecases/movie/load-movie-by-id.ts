import { MovieModel } from "../../models/movie";
import { MovieRepository } from "../../repositories/movie-repository";

export class LoadMovieById {
  private readonly movieRepository: MovieRepository;

  constructor(movieRepository: MovieRepository) {
    this.movieRepository = movieRepository;
  }

  async loadById(id: string): Promise<MovieModel | null> {
    return await this.movieRepository.loadById(id);
  }
}
