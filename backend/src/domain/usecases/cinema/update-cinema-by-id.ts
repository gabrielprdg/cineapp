import { CinemaParams, CinemaRepository } from "../../repositories/cinema-repository"

export class UpdateCinemaById {
  private readonly cinemaRepository: CinemaRepository

  constructor(cinemaRepository: CinemaRepository) {
    this.cinemaRepository = cinemaRepository
  }

  async update(id: string, data: CinemaParams): Promise<void> {
    await this.cinemaRepository.updateById(data, id)
  }
}
