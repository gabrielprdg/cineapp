import { DeleteMovieById } from "../../../domain/usecases/movie/delete-movie-by-id"
import { PostgresMovieRepository } from "../../../infra/postgres/movie/movie-repository"
import { DeleteMovieByIdController } from "../../../presentation/controllers/movie/delete-movie-by-id-controller"
import { Controller } from "../../../presentation/protocols"

const makeDbDeleteMovieById = (): DeleteMovieById => {
  const movieRepo = new PostgresMovieRepository()
  return new DeleteMovieById(movieRepo)
}

export const makeDeleteMovieByIdController = (): Controller => {
  return new DeleteMovieByIdController(makeDbDeleteMovieById())
}
