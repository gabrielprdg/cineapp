import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { badRequest, noContent, serverError } from '../../helpers/http/http-helper'
import { DeleteMovieById } from '../../../domain/usecases/movie/delete-movie-by-id'

export class DeleteMovieByIdController implements Controller {
  private readonly deleteMovieById: DeleteMovieById

  constructor(deleteMovieById: DeleteMovieById) {
    this.deleteMovieById = deleteMovieById
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      if (!id) {
        return badRequest(new Error('Missing param: id'))
      }

      await this.deleteMovieById.delete(id)
      return noContent()
    } catch (err: any) {
      return serverError(err)
    }
  }
}
