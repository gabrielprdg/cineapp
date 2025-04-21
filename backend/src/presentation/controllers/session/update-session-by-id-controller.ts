import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { Validation } from '../../protocols/validation'
import { badRequest, noContent, serverError } from '../../helpers/http/http-helper'
import { UpdateSessionById } from '../../../domain/usecases/session/update-session-by-id'

export class UpdateSessionByIdController implements Controller {
  constructor(
    private readonly updateSessionById: UpdateSessionById
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {


      const { id } = httpRequest.params
      const { movie_id, cinema_id, day_of_week, date } = httpRequest.body

      await this.updateSessionById.update(id, {
        movie_id,
        cinema_id,
        day_of_week,
        date
      })

      return noContent()
    } catch (err: any) {
      return serverError(err)
    }
  }
}
