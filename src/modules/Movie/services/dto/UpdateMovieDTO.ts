import { Movie } from '@modules/Movie/entities/Movie';

type PartialMovie = Partial<Omit<Movie, 'created_at' | 'updated_at'>>;

interface IUpdateMovieDTO extends PartialMovie {
  id: string;
}

export { IUpdateMovieDTO };
