import { movieRouter } from '@modules/routes/movie.routes';
import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.use('/movies', movieRouter);

router.get('/', (request: Request, response: Response) =>
  response.send('Atria - 1.0.0'),
);

router.use((request: Request, response: Response, next: NextFunction) => {
  if (!request.route)
    return response.status(404).send(`${request.url} não encontrado`);
  return next();
});

export { router };
