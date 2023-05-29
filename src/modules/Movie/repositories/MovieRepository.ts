import { PoolClient } from 'pg';
import { createConnection } from '@shared/database';
import { Movie } from '../entities/Movie';
import { IMovieRepository } from './MovieRepository.interface';
import { IFindByGenreDTO } from './dto/FindByGenreDTO';

class MovieRepository implements IMovieRepository {
  private client: PoolClient;

  constructor() {
    createConnection().then(client => {
      this.client = client;
    });
  }

  async save({
    director,
    genres,
    id,
    runtime,
    title,
    year,
    active,
  }: Movie): Promise<Movie> {
    const { rows } = await this.client.query(
      'INSERT INTO movies (id, title, director, genres, year, runtime, active) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT ("id") DO UPDATE SET "title" = $2, "director" = $3, "genres" = $4, "year" = $5, "runtime" = $6, "active" = $7, updated_at = NOW() RETURNING *',
      [id, title, director, genres, year, runtime, active],
    );

    return rows[0];
  }

  findByTitle(title: string): Promise<Movie | undefined> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<Movie | undefined> {
    throw new Error('Method not implemented.');
  }

  index(page: number, limit: number): Promise<[Movie[], number]> {
    throw new Error('Method not implemented.');
  }

  findByGenres(data: IFindByGenreDTO): Promise<Movie[]> {
    throw new Error('Method not implemented.');
  }
}

export { MovieRepository };
