import { BaseEntity } from '@shared/entities/BaseEntity';

class Movie extends BaseEntity {
  title: string;

  year: number;

  runtime: number;

  genres: string[];

  director: string;

  active: boolean;
}

export { Movie };
