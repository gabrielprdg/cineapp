import { UpdateCinemaById } from "../../../domain/usecases/cinema/update-cinema-by-id"
import { PostgresCinemaRepository } from "../../../infra/postgres/cinema/cinema-repository"
import { UpdateCinemaByIdController } from "../../../presentation/controllers/cinema/update-cinema-by-id-controller"
import { Controller } from "../../../presentation/protocols"


const makeDbUpdateCinemaById = (): UpdateCinemaById => {
  const cinemaRepo = new PostgresCinemaRepository()
  return new UpdateCinemaById(cinemaRepo)
}

export const makeUpdateCinemaByIdController = (): Controller => {
  return new UpdateCinemaByIdController(makeDbUpdateCinemaById())
}
