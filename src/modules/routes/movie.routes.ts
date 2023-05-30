import { MovieController } from '@modules/controllers/Movie.controller';
import { Router } from 'express';
import {
  createMovieMiddleware,
  indexMoviesMiddleware,
} from './vallidation/movie.validation';

const movieRouter = Router();
const movieController = new MovieController();

movieRouter.post('/', createMovieMiddleware, (req, res) =>
  movieController.create(req, res),
);

movieRouter.get('/', indexMoviesMiddleware, (req, res) =>
  movieController.index(req, res),
);

export { movieRouter };
