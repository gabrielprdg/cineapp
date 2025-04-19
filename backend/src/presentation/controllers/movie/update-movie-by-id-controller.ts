import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { Validation } from '../../protocols/validation'
import { badRequest, noContent, serverError } from '../../helpers/http/http-helper'
import { UpdateMovieById } from '../../../domain/usecases/movie/update-movie-by-id'

export class UpdateMovieByIdController implements Controller {
  private readonly updateMovieById: UpdateMovieById

  constructor(updateMovieById: UpdateMovieById) {
    this.updateMovieById = updateMovieById
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const movieId = httpRequest.params?.id
      const { gender, name, duration, classification, releaseDate, synopsis } = httpRequest.body

      await this.updateMovieById.update(movieId, {
        gender,
        name,
        duration,
        classification,
        releaseDate,
        synopsis
      })

      return noContent()
    } catch (err: any) {
      return serverError(err)
    }
  }
}
