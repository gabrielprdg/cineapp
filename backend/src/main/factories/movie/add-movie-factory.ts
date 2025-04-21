import { AddMovie } from "../../../domain/usecases/movie/add-movie"
import { PostgresMovieRepository } from "../../../infra/postgres/movie/movie-repository"
import { AddMovieController } from "../../../presentation/controllers/movie/add-movie-controller"
import { Controller, Validation } from "../../../presentation/protocols"
import { RequiredFieldValidation } from "../../../presentation/validation/required-field-validation"

export const makeAddMovieValidation = (): Validation => {
  const requiredFields = ['name', 'gender', 'duration', 'classification', 'release_date', 'synopsis']
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

const makeDbAddMovie = (): AddMovie => {
  const moviePgRepository = new PostgresMovieRepository()
  return new AddMovie(moviePgRepository)
}

export const makeAddMovieController = (): Controller => {
  const controller = new AddMovieController(makeAddMovieValidation(), makeDbAddMovie())
  return controller
}
