import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddSessionController } from '../factories/session/add-session-factory'
import { makeDeleteSessionByIdController } from '../factories/session/delete-session-by-id-factory'
import { makeLoadSessionsController } from '../factories/session/load-sessions-factory'
import { makeUpdateSessionByIdController } from '../factories/session/update-session-by-id-factory'
import { makeLoadSessionByIdController } from '../factories/session/load-session-by-id-factory'

export default (router: Router): void => {
  router.post('/v1/session', adaptRoute(makeAddSessionController()))
  router.get('/v1/sessions', adaptRoute(makeLoadSessionsController()))
  router.get('/v1/session/:id', adaptRoute(makeLoadSessionByIdController()))
  router.put('/v1/session/:id', adaptRoute(makeUpdateSessionByIdController()))
  router.delete('/v1/session', adaptRoute(makeDeleteSessionByIdController()))
}