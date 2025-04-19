import { SessionModel } from "../../models/session";
import { SessionRepository } from "../../repositories/session-repository";

export class LoadSessionById {
  private readonly sessionRepository: SessionRepository;

  constructor(sessionRepository: SessionRepository) {
    this.sessionRepository = sessionRepository;
  }

  async loadById(id: string): Promise<SessionModel | null> {
    return await this.sessionRepository.loadById(id);
  }
}
