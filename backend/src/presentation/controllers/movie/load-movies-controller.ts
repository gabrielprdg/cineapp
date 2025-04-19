import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { ok, serverError } from '../../helpers/http/http-helper'
import { LoadMovies } from '../../../domain/usecases/movie/load-movies'

export class LoadMoviesController implements Controller {
  private readonly loadMovies: LoadMovies

  constructor(loadMovies: LoadMovies) {
    this.loadMovies = loadMovies
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const movies = await this.loadMovies.load()
      return ok(movies)
    } catch (err: any) {
      return serverError(err)
    }
  }
}