import { CreateMovieService } from '@modules/Movie/services/CreateMovie.service';
import { IndexMoviesService } from '@modules/Movie/services/IndexMovies.service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class MovieController {
  createMovie: CreateMovieService;

  indexMovies: IndexMoviesService;

  constructor() {
    this.createMovie = container.resolve(CreateMovieService);
    this.indexMovies = container.resolve(IndexMoviesService);
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

  async index(req: Request, res: Response): Promise<Response> {
    const { page, limit, title } = req.query;

    const movies = await this.indexMovies.execute({
      page: Number(page),
      limit: Number(limit),
      title: String(title),
    });

    return res.status(200).json(movies);
  }
}

export { MovieController };
