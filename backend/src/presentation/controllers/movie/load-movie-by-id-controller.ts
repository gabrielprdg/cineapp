import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { serverError, ok } from '../../helpers/http/http-helper'
import { LoadMovieById } from '../../../domain/usecases/movie/load-movie-by-id'

export class LoadMovieByIdController implements Controller {
  private readonly loadMovieById: LoadMovieById

  constructor(loadMovieById: LoadMovieById) {
    this.loadMovieById = loadMovieById
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const movie = await this.loadMovieById.loadById(id)
      return ok(movie)
    } catch (err: any) {
      return serverError(err)
    }
  }
}
