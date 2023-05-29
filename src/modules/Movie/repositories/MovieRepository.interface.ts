import { Movie } from '../entities/Movie';
import { IFindByGenreDTO } from './dto/FindByGenreDTO';

interface IMovieRepository {
  save(movie: Movie): Promise<Movie>;
  findByTitle(title: string): Promise<Movie | undefined>;
  findById(id: string): Promise<Movie | undefined>;
  index(page: number, limit: number): Promise<[Movie[], number]>;
  findByGenres(data: IFindByGenreDTO): Promise<Movie[]>;
}

export { IMovieRepository };
