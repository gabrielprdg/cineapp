import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { serverError, ok, badRequest } from '../../helpers/http/http-helper';
import { LoadCinemaById } from '../../../domain/usecases/cinema/load-cinema-by-id';

export class LoadCinemaByIdController implements Controller {
  private readonly loadCinemaById: LoadCinemaById;

  constructor(loadCinemaById: LoadCinemaById) {
    this.loadCinemaById = loadCinemaById;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;

      if (!id) {
        return badRequest(new Error('Missing param: id'));
      }

      const cinema = await this.loadCinemaById.loadById(id);
      return ok(cinema);
    } catch (err: any) {
      return serverError(err);
    }
  }
}
