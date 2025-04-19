import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddMovieController } from '../factories/movie/add-movie-factory'
import { makeDeleteMovieByIdController } from '../factories/movie/delete-movie-by-id-factory'
import { makeLoadMoviesController } from '../factories/movie/load-movies-factory'
import { makeUpdateMovieByIdController } from '../factories/movie/update-movie-by-id-factory'

export default (router: Router): void => {
  router.post('/v1/movie', adaptRoute(makeAddMovieController()))
  router.get('/v1/movies', adaptRoute(makeLoadMoviesController()))
  router.put('/v1/movie', adaptRoute(makeUpdateMovieByIdController()))
  router.delete('/v1/movie', adaptRoute(makeDeleteMovieByIdController()))
}