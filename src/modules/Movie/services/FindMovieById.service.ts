import { AppError } from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import { Movie } from '../entities/Movie';
import { IMovieRepository } from '../repositories/MovieRepository.interface';

@injectable()
class FindMovieByIdService {
  constructor(
    @inject('MovieRepository')
    private movieRepository: IMovieRepository,
  ) {}

  async execute(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findById(id);

    if (!movie) {
      throw new AppError('Filme não encontrado');
    }

    return movie;
  }
}

export { FindMovieByIdService };
