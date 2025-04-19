import { LoadCinemaById } from "../../../domain/usecases/cinema/load-cinema-by-id"
import { PostgresCinemaRepository } from "../../../infra/postgres/cinema/cinema-repository"
import { LoadCinemaByIdController } from "../../../presentation/controllers/cinema/load-cinema-by-id-controller"
import { Controller } from "../../../presentation/protocols"

const makeDbLoadCinemaById = (): LoadCinemaById => {
  const cinemaRepo = new PostgresCinemaRepository()
  return new LoadCinemaById(cinemaRepo)
}

export const makeLoadCinemaByIdController = (): Controller => {
  return new LoadCinemaByIdController(makeDbLoadCinemaById())
}
