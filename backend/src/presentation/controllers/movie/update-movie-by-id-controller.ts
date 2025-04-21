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

      const movie_id = httpRequest.params?.id
      const { gender, name, duration, classification, release_date, synopsis } = httpRequest.body

      await this.updateMovieById.update(movie_id, {
        gender,
        name,
        duration,
        classification,
        release_date,
        synopsis
      })

      return noContent()
    } catch (err: any) {
      return serverError(err)
    }
  }
}
