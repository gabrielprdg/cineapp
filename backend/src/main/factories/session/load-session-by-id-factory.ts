import { LoadSessionById } from "../../../domain/usecases/session/load-session-by-id"
import { PostgresSessionRepository } from "../../../infra/postgres/session/session-repository"
import { LoadSessionByIdController } from "../../../presentation/controllers/session/load-session-by-id-controller"
import { Controller } from "../../../presentation/protocols"

const makeDbLoadSessionById = (): LoadSessionById => {
  const sessionRepo = new PostgresSessionRepository()
  return new LoadSessionById(sessionRepo)
}

export const makeLoadSessionByIdController = (): Controller => {
  return new LoadSessionByIdController(makeDbLoadSessionById())
}
