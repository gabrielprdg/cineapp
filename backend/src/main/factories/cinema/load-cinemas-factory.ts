import { Controller } from "../../../presentation/protocols"
import { LoadCinemasController } from "../../../presentation/controllers/cinema/load-cinemas-controller"
import { PostgresCinemaRepository } from "../../../infra/postgres/cinema/cinema-repository"
import { LoadCinemas } from "../../../domain/usecases/cinema/load-cinemas"

const makeDbLoadCinemas = (): LoadCinemas => {
  const cinemaRepo = new PostgresCinemaRepository()
  return new LoadCinemas(cinemaRepo)
}

export const makeLoadCinemasController = (): Controller => {
  return new LoadCinemasController(makeDbLoadCinemas())
}
