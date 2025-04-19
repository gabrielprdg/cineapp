import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { badRequest, noContent, serverError } from '../../helpers/http/http-helper'
import { DeleteCinemaById } from '../../../domain/usecases/cinema/delete-cinema-by-id'
import { Validation } from '../../protocols/validation'

export class DeleteCinemaByIdController implements Controller {
  private readonly deleteCinemaById: DeleteCinemaById

  constructor(deleteCinemaById: DeleteCinemaById) {
    this.deleteCinemaById = deleteCinemaById
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const { id } = httpRequest.params
      await this.deleteCinemaById.delete(id)

      return noContent()
    } catch (err: any) {
      return serverError(err)
    }
  }
}
