import { SessionModel } from "../../models/session"
import { SessionRepository } from "../../repositories/session-repository"

export class LoadSessions {
  private readonly sessionRepository: SessionRepository

  constructor(sessionRepository: SessionRepository) {
    this.sessionRepository = sessionRepository
  }

  async load(): Promise<SessionModel[]> {
    return await this.sessionRepository.loadAll()
  }
}
