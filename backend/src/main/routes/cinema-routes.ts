import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddCinemaController } from '../factories/cinema/add-cinema-factory'
import { makeLoadCinemasController } from '../factories/cinema/load-cinemas-factory'
import { makeUpdateCinemaByIdController } from '../factories/cinema/update-cinema-by-id-factory'
import { makeDeleteCinemaByIdController } from '../factories/cinema/delete-cinema-by-id-factory'
import { makeLoadCinemaByIdController } from '../factories/cinema/load-cinema-by-id-factory'

export default (router: Router): void => {
  router.post('/v1/cinema', adaptRoute(makeAddCinemaController()))
  router.get('/v1/cinemas', adaptRoute(makeLoadCinemasController()))
  router.get('/v1/cinema/:id', adaptRoute(makeLoadCinemaByIdController()))
  router.put('/v1/cinema/:id', adaptRoute(makeUpdateCinemaByIdController()))
  router.delete('/v1/cinema/:id', adaptRoute(makeDeleteCinemaByIdController()))
}