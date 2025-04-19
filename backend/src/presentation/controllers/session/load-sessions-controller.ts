import { LoadSessions } from '../../../domain/usecases/session/load-sessions'
import { ok, serverError } from '../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoadSessionsController implements Controller {
  private readonly loadSession: LoadSessions

  constructor(loadSession: LoadSessions) {
    this.loadSession = loadSession
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const sessions = await this.loadSession.load()

      return ok(sessions)
    } catch (err: any) {
      return serverError(err)
    }
  }
}
