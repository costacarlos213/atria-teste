import { ICreateMovieDTO } from './CreateMovieDTO';

type PartialMovie = Partial<ICreateMovieDTO>;

interface IUpdateMovieDTO extends PartialMovie {
  id: string;
}

export { IUpdateMovieDTO };
