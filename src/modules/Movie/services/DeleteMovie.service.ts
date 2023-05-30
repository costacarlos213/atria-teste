import { AppError } from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import { IMovieRepository } from '../repositories/MovieRepository.interface';

@injectable()
class DeleteMovieService {
  constructor(
    @inject('MovieRepository')
    private movieRepository: IMovieRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const movie = await this.movieRepository.findById(id);

    if (!movie) {
      throw new AppError('Filme não encontrado', 404);
    }

    await this.movieRepository.delete(id);
  }
}

export { DeleteMovieService };
