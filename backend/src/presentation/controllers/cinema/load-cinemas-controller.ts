import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { serverError, ok } from '../../helpers/http/http-helper'
import { LoadCinemas } from '../../../domain/usecases/cinema/load-cinemas'

export class LoadCinemasController implements Controller {
  private readonly loadCinemas: LoadCinemas

  constructor(loadCinemas: LoadCinemas) {
    this.loadCinemas = loadCinemas
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const cinemas = await this.loadCinemas.load()
      return ok(cinemas)
    } catch (err: any) {
      return serverError(err)
    }
  }
}
