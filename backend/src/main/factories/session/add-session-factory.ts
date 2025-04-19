import { AddSession } from "../../../domain/usecases/session/add-session"
import { PostgresSessionRepository } from "../../../infra/postgres/session/session-repository"
import { AddSessionController } from "../../../presentation/controllers/session/add-session-controller"
import { Controller, Validation } from "../../../presentation/protocols"
import { RequiredFieldValidation } from "../../../presentation/validation/required-field-validation"

export const makeAddSessionValidation = (): Validation => {
  const requiredFields = ['movieId', 'cinemaId', 'dayOfWeek', 'date']
  const validations = requiredFields.map(field => new RequiredFieldValidation(field))

  return {
    validate: (input: any): Error | undefined => {
      for (const validation of validations) {
        const error = validation.validate(input)
        if (error) return error
      }
    }
  }
}

const makeDbAddSession = (): AddSession => {
  const sessionPgRepository = new PostgresSessionRepository()
  return new AddSession(sessionPgRepository)
}

export const makeAddSessionController = (): Controller => {
  return new AddSessionController(makeAddSessionValidation(), makeDbAddSession())
}
