interface ICreateMovieDTO {
  title: string;
  year: number;
  runtime: number;
  genres: string[];
  director: string;
  active: boolean;
}

export { ICreateMovieDTO };
