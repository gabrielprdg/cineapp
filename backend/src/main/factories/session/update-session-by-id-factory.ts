import { UpdateSessionById } from "../../../domain/usecases/session/update-session-by-id"
import { PostgresSessionRepository } from "../../../infra/postgres/session/session-repository"
import { UpdateSessionByIdController } from "../../../presentation/controllers/session/update-session-by-id-controller"
import { Controller } from "../../../presentation/protocols"

const makeDbUpdateSessionById = (): UpdateSessionById => {
  const sessionRepo = new PostgresSessionRepository()
  return new UpdateSessionById(sessionRepo)
}

export const makeUpdateSessionByIdController = (): Controller => {
  return new UpdateSessionByIdController(makeDbUpdateSessionById())
}
