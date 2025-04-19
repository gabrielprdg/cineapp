import { AddCinema } from "../../../domain/usecases/cinema/add-cinema"
import { PostgresCinemaRepository } from "../../../infra/postgres/cinema/cinema-repository"
import { AddCinemaController } from "../../../presentation/controllers/cinema/add-cinema-controller"
import { Controller, Validation } from "../../../presentation/protocols"
import { RequiredFieldValidation } from "../../../presentation/validation/required-field-validation"


export const makeAddCinemaValidation = (): Validation => {
  const requiredFields = ['name', 'city', 'state']
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

const makeDbAddCinema = (): AddCinema => {
  const CinemaPgRepository = new PostgresCinemaRepository()
  console.log('gnnnnnnnnnnnnnnn')
  return new AddCinema(CinemaPgRepository)
}

export const makeAddCinemaController = (): Controller => {
  console.log('ssssssssssss')
  const controller = new AddCinemaController(makeAddCinemaValidation(), makeDbAddCinema())
  return controller
}
