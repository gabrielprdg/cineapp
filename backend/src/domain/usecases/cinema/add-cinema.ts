import { CinemaParams, CinemaRepository } from "../../repositories/cinema-repository"

export class AddCinema {
  private readonly addCinemaRepository: CinemaRepository
  constructor(addCinemaRepository: CinemaRepository) {
    this.addCinemaRepository = addCinemaRepository
  }

  async add(data: CinemaParams): Promise<void> {
    await this.addCinemaRepository.create(data)
  }
}