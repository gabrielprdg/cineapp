import { DeleteCinemaById } from "../../../domain/usecases/cinema/delete-cinema-by-id"
import { PostgresCinemaRepository } from "../../../infra/postgres/cinema/cinema-repository"
import { DeleteCinemaByIdController } from "../../../presentation/controllers/cinema/delete-cinema-by-id-controller"
import { Controller } from "../../../presentation/protocols"

const makeDbDeleteCinemaById = (): DeleteCinemaById => {
  const cinemaRepo = new PostgresCinemaRepository()
  return new DeleteCinemaById(cinemaRepo)
}

export const makeDeleteCinemaByIdController = (): Controller => {
  return new DeleteCinemaByIdController(makeDbDeleteCinemaById())
}
