import { CreateMovieService } from '@modules/Movie/services/CreateMovie.service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class MovieController {
  createMovie: CreateMovieService;

  constructor() {
    this.createMovie = container.resolve(CreateMovieService);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { title, year, runtime, genres, director, active } = req.body;

    const movie = await this.createMovie.execute({
      title,
      year,
      runtime,
      genres,
      director,
      active,
    });

    return res.status(201).json(movie);
  }
}

export { MovieController };
