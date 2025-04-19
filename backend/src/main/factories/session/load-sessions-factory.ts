import { LoadSessions } from "../../../domain/usecases/session/load-sessions"
import { PostgresSessionRepository } from "../../../infra/postgres/session/session-repository"
import { LoadSessionsController } from "../../../presentation/controllers/session/load-sessions-controller"
import { Controller } from "../../../presentation/protocols"

const makeDbLoadSessions = (): LoadSessions => {
  const sessionRepo = new PostgresSessionRepository()
  return new LoadSessions(sessionRepo)
}

export const makeLoadSessionsController = (): Controller => {
  return new LoadSessionsController(makeDbLoadSessions())
}
