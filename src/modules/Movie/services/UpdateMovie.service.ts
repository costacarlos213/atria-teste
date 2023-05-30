import { AppError } from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import { Movie } from '../entities/Movie';
import { IMovieRepository } from '../repositories/MovieRepository.interface';
import { IUpdateMovieDTO } from './dto/UpdateMovieDTO';

@injectable()
class UpdateMovieService {
  constructor(
    @inject('MovieRepository')
    private movieRepository: IMovieRepository,
  ) {}

  async execute({
    id,
    active,
    director,
    genres,
    runtime,
    title,
    year,
  }: IUpdateMovieDTO): Promise<Movie> {
    const movie = await this.movieRepository.findById(id);

    if (!movie) {
      throw new AppError('Filme não encontrado', 404);
    }

    Object.assign(movie, {
      active: active ?? movie.active,
      director: director ?? movie.director,
      genres: genres ?? movie.genres,
      runtime: runtime ?? movie.runtime,
      title: title ?? movie.title,
      year: year ?? movie.year,
    });

    return this.movieRepository.save(movie);
  }
}

export { UpdateMovieService };
