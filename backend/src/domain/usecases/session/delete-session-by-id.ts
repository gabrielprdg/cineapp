import { SessionRepository } from "../../repositories/session-repository"

export class DeleteSessionById {
  private readonly sessionRepository: SessionRepository

  constructor(sessionRepository: SessionRepository) {
    this.sessionRepository = sessionRepository
  }

  async delete(id: string): Promise<void> {
    await this.sessionRepository.deleteById(id)
  }
}
