import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { Validation } from '../../protocols/validation'
import { badRequest, noContent, serverError } from '../../helpers/http/http-helper'
import { UpdateCinemaById } from '../../../domain/usecases/cinema/update-cinema-by-id'

export class UpdateCinemaByIdController implements Controller {
  private readonly updateCinemaById: UpdateCinemaById

  constructor(updateCinemaById: UpdateCinemaById) {
    this.updateCinemaById = updateCinemaById
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const { id } = httpRequest.params
      const { name, city, state } = httpRequest.body

      await this.updateCinemaById.update(id, {
        name,
        city,
        state
      })

      return noContent()
    } catch (err: any) {
      console.log('sxssss', err)
      return serverError(err)
    }
  }
}
