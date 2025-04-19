import { LoadMovies } from "../../../domain/usecases/movie/load-movies"
import { PostgresMovieRepository } from "../../../infra/postgres/movie/movie-repository"
import { LoadMoviesController } from "../../../presentation/controllers/movie/load-movies-controller"
import { Controller } from "../../../presentation/protocols"

const makeDbLoadMovies = (): LoadMovies => {
  const movieRepo = new PostgresMovieRepository()
  return new LoadMovies(movieRepo)
}

export const makeLoadMoviesController = (): Controller => {
  return new LoadMoviesController(makeDbLoadMovies())
}
