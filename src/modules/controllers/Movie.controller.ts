import { CreateMovieService } from '@modules/Movie/services/CreateMovie.service';
import { DeleteMovieService } from '@modules/Movie/services/DeleteMovie.service';
import { FindMovieByIdService } from '@modules/Movie/services/FindMovieById.service';
import { IndexMoviesService } from '@modules/Movie/services/IndexMovies.service';
import { UpdateMovieService } from '@modules/Movie/services/UpdateMovie.service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class MovieController {
  createMovie: CreateMovieService;

  indexMovies: IndexMoviesService;

  updateMovie: UpdateMovieService;

  showMovie: FindMovieByIdService;

  deleteMovie: DeleteMovieService;

  constructor() {
    this.createMovie = container.resolve(CreateMovieService);
    this.indexMovies = container.resolve(IndexMoviesService);
    this.updateMovie = container.resolve(UpdateMovieService);
    this.showMovie = container.resolve(FindMovieByIdService);
    this.deleteMovie = container.resolve(DeleteMovieService);
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

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const movie = await this.showMovie.execute(id);

    return res.status(200).json(movie);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await this.deleteMovie.execute(id);

    return res.status(204).send();
  }
}

export { MovieController };
