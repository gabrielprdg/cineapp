import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { noContent, serverError } from '../../helpers/http/http-helper'
import { DeleteSessionById } from '../../../domain/usecases/session/delete-session-by-id'

export class DeleteSessionByIdController implements Controller {
  constructor(private readonly deleteSessionById: DeleteSessionById) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      await this.deleteSessionById.delete(id)
      return noContent()
    } catch (err: any) {
      return serverError(err)
    }
  }
}
