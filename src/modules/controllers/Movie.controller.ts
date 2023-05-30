import { CreateMovieService } from '@modules/Movie/services/CreateMovie.service';
import { IndexMoviesService } from '@modules/Movie/services/IndexMovies.service';
import { UpdateMovieService } from '@modules/Movie/services/UpdateMovie.service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class MovieController {
  createMovie: CreateMovieService;

  indexMovies: IndexMoviesService;

  updateMovie: UpdateMovieService;

  constructor() {
    this.createMovie = container.resolve(CreateMovieService);
    this.indexMovies = container.resolve(IndexMoviesService);
    this.updateMovie = container.resolve(UpdateMovieService);
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
    const { page, limit, title } = req.query as typeof req.query & {
      page: number;
      limit: number;
      title: string;
    };

    const movies = await this.indexMovies.execute({
      page,
      limit,
      title,
    });

    return res.status(200).json(movies);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const { active, director, genres, runtime, title, year } = req.body;

    const movie = await this.updateMovie.execute({
      id,
      active,
      director,
      genres,
      runtime,
      title,
      year,
    });

    return res.status(200).json(movie);
  }
}

export { MovieController };
