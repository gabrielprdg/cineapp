import { UpdateMovieById } from "../../../domain/usecases/movie/update-movie-by-id"
import { PostgresMovieRepository } from "../../../infra/postgres/movie/movie-repository"
import { UpdateMovieByIdController } from "../../../presentation/controllers/movie/update-movie-by-id-controller"
import { Controller } from "../../../presentation/protocols"

const makeDbUpdateMovieById = (): UpdateMovieById => {
  const movieRepo = new PostgresMovieRepository()
  return new UpdateMovieById(movieRepo)
}

export const makeUpdateMovieByIdController = (): Controller => {
  return new UpdateMovieByIdController(makeDbUpdateMovieById())
}
