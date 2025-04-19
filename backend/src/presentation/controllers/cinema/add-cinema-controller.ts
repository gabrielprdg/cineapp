import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { Validation } from '../../protocols/validation'
import { badRequest, noContent, serverError } from '../../helpers/http/http-helper'
import { AddCinema } from '../../../domain/usecases/cinema/add-cinema'

export class AddCinemaController implements Controller {
  private readonly validation: Validation
  private readonly addCinema: AddCinema

  constructor(validation: Validation, addCinema: AddCinema) {
    this.validation = validation
    this.addCinema = addCinema
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    console.log('kkkkkkkkkkkk', httpRequest)
    try {


      const { name, city, state } = httpRequest.body
      await this.addCinema.add({
        name,
        city,
        state
      })

      return noContent()
    } catch (err: any) {
      console.log('eeeeeeeee', err)
      return serverError(err)
    }
  }
}
