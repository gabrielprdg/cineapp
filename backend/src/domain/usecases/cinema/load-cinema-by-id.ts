import { CinemaModel } from "../../models/cinema";
import { CinemaRepository } from "../../repositories/cinema-repository";

export class LoadCinemaById {
  private readonly cinemaRepository: CinemaRepository;

  constructor(cinemaRepository: CinemaRepository) {
    this.cinemaRepository = cinemaRepository;
  }

  async loadById(id: string): Promise<CinemaModel | null> {
    return await this.cinemaRepository.loadById(id);
  }
}
