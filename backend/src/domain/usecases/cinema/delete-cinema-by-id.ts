import { CinemaRepository } from "../../repositories/cinema-repository"

export class DeleteCinemaById {
  private readonly cinemaRepository: CinemaRepository

  constructor(cinemaRepository: CinemaRepository) {
    this.cinemaRepository = cinemaRepository
  }

  async delete(id: string): Promise<void> {
    await this.cinemaRepository.deleteById(id)
  }
}