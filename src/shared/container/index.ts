import { MovieRepository } from '@modules/Movie/repositories/MovieRepository';
import { IMovieRepository } from '@modules/Movie/repositories/MovieRepository.interface';
import { container } from 'tsyringe';

container.registerSingleton<IMovieRepository>(
  'MovieRepository',
  MovieRepository,
);
