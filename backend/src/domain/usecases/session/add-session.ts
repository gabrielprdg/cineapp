import { SessionParams, SessionRepository } from "../../repositories/session-repository"

export class AddSession {
  private readonly sessionRepository: SessionRepository

  constructor(sessionRepository: SessionRepository) {
    this.sessionRepository = sessionRepository
  }

  async add(data: SessionParams): Promise<void> {
    await this.sessionRepository.create(data)
  }
}
