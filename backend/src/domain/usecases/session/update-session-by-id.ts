import { SessionParams, SessionRepository } from "../../repositories/session-repository"

export class UpdateSessionById {
  private readonly sessionRepository: SessionRepository

  constructor(sessionRepository: SessionRepository) {
    this.sessionRepository = sessionRepository
  }

  async update(id: string, data: SessionParams): Promise<void> {
    await this.sessionRepository.updateById(data, id)
  }
}
