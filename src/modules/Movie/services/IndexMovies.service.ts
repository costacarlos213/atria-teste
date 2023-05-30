import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { inject, injectable } from 'tsyringe';
import { Movie } from '../entities/Movie';
import { IMovieRepository } from '../repositories/MovieRepository.interface';
import { IIndexMoviesDTO } from './dto/FindMoviesByTitleDTO';

@injectable()
class IndexMoviesService {
  constructor(
    @inject('MovieRepository')
    private movieRepository: IMovieRepository,
  ) {}

  async execute({
    limit,
    page,
    title,
  }: IIndexMoviesDTO): Promise<IPaginatedResponse<Movie>> {
    const [movies, total] = await this.movieRepository.index({
      page,
      limit,
      title,
    });

    return {
      results: movies,
      total,
      page,
      limit,
    };
  }
}

export { IndexMoviesService };
