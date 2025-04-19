import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { serverError, ok } from '../../helpers/http/http-helper'
import { LoadSessionById } from '../../../domain/usecases/session/load-session-by-id'

export class LoadSessionByIdController implements Controller {
  private readonly loadSessionById: LoadSessionById

  constructor(loadSessionById: LoadSessionById) {
    this.loadSessionById = loadSessionById
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const session = await this.loadSessionById.loadById(id)
      return ok(session)
    } catch (err: any) {
      return serverError(err)
    }
  }
}
