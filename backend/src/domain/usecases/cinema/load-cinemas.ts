import { CinemaModel } from "../../models/cinema"
import { CinemaRepository } from "../../repositories/cinema-repository"

export class LoadCinemas {
  private readonly cinemaRepository: CinemaRepository

  constructor(cinemaRepository: CinemaRepository) {
    this.cinemaRepository = cinemaRepository
  }

  async load(): Promise<CinemaModel[]> {
    return this.cinemaRepository.loadAll()
  }
}