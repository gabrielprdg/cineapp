import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { Validation } from '../../protocols/validation'
import { badRequest, noContent, serverError } from '../../helpers/http/http-helper'
import { AddSession } from '../../../domain/usecases/session/add-session'

export class AddSessionController implements Controller {
  private readonly validation: Validation
  private readonly addSession: AddSession

  constructor(validation: Validation, addSession: AddSession) {
    this.validation = validation
    this.addSession = addSession
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { movieId, cinemaId, dayOfWeek, date } = httpRequest.body

      const parsedDate = new Date(date)

      const localDate = new Date(parsedDate.getTime() + (3 * 60 * 60 * 1000))

      await this.addSession.add({
        movieId,
        cinemaId,
        dayOfWeek,
        date: localDate
      })

      return noContent()
    } catch (err: any) {
      return serverError(err)
    }
  }

}
