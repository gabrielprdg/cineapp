import { DeleteSessionById } from "../../../domain/usecases/session/delete-session-by-id"
import { PostgresSessionRepository } from "../../../infra/postgres/session/session-repository"
import { DeleteSessionByIdController } from "../../../presentation/controllers/session/delete-session-by-id-controller"
import { Controller, Validation } from "../../../presentation/protocols"
import { RequiredFieldValidation } from "../../../presentation/validation/required-field-validation"

const makeDbDeleteSessionById = (): DeleteSessionById => {
  const sessionRepo = new PostgresSessionRepository()
  return new DeleteSessionById(sessionRepo)
}

export const makeDeleteSessionByIdController = (): Controller => {
  return new DeleteSessionByIdController(makeDbDeleteSessionById())
}
