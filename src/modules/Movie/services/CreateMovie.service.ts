import { inject, injectable } from 'tsyringe';
import { IMovieRepository } from '../repositories/MovieRepository.interface';
import { ICreateMovieDTO } from './dto/CreateMovieDTO';
import { Movie } from '../entities/Movie';

@injectable()
class CreateMovieService {
  constructor(
    @inject('MovieRepository')
    private movieRepository: IMovieRepository,
  ) {}

  async execute(data: ICreateMovieDTO): Promise<Movie> {
    const movie = new Movie();

    Object.assign(movie, data);

    const movieCreated = await this.movieRepository.save(movie);

    return movieCreated;
  }
}

export { CreateMovieService };
