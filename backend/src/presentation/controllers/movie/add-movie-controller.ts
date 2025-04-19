import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { Validation } from '../../protocols/validation'
import { badRequest, noContent, serverError } from '../../helpers/http/http-helper'
import { AddMovie } from '../../../domain/usecases/movie/add-movie'

export class AddMovieController implements Controller {
  private readonly validation: Validation
  private readonly addMovie: AddMovie

  constructor(validation: Validation, addMovie: AddMovie) {
    this.validation = validation
    this.addMovie = addMovie
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { gender, name, duration, classification, releaseDate, synopsis } = httpRequest.body
      await this.addMovie.add({
        gender,
        name,
        duration,
        classification,
        releaseDate,
        synopsis
      })

      return noContent()
    } catch (err: any) {
      console.log('bvccccccccccc', err)
      return serverError(err)
    }
  }
}