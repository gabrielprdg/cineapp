import { LoadMovieById } from "../../../domain/usecases/movie/load-movie-by-id"
import { PostgresMovieRepository } from "../../../infra/postgres/movie/movie-repository"
import { LoadMovieByIdController } from "../../../presentation/controllers/movie/load-movie-by-id-controller"
import { Controller } from "../../../presentation/protocols"

const makeDbLoadMovieById = (): LoadMovieById => {
  const movieRepo = new PostgresMovieRepository()
  return new LoadMovieById(movieRepo)
}

export const makeLoadMovieByIdController = (): Controller => {
  return new LoadMovieByIdController(makeDbLoadMovieById())
}
