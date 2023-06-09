import { MovieController } from '@modules/controllers/Movie.controller';
import { Router } from 'express';
import {
  createMovieMiddleware,
  indexMoviesMiddleware,
  showMovieMiddleware,
  updateMovieMiddleware,
} from './vallidation/movie.validation';

const movieRouter = Router();
const movieController = new MovieController();

movieRouter.post('/', createMovieMiddleware, (req, res) =>
  movieController.create(req, res),
);

movieRouter.get('/', indexMoviesMiddleware, (req, res) =>
  movieController.index(req, res),
);

movieRouter.put('/:id', updateMovieMiddleware, (req, res) =>
  movieController.update(req, res),
);

movieRouter.get('/:id', showMovieMiddleware, (req, res) =>
  movieController.show(req, res),
);

movieRouter.delete('/:id', showMovieMiddleware, (req, res) =>
  movieController.delete(req, res),
);

export { movieRouter };
