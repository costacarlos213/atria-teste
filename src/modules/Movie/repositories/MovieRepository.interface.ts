import { Movie } from '../entities/Movie';
import { IIndexMoviesDTO } from '../services/dto/FindMoviesByTitleDTO';

interface IMovieRepository {
  save(movie: Movie): Promise<Movie>;
  index(data: IIndexMoviesDTO): Promise<[Movie[], number]>;
  findById(id: string): Promise<Movie | undefined>;
  delete(id: string): Promise<void>;
}

export { IMovieRepository };
