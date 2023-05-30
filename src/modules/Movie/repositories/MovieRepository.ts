import { PoolClient } from 'pg';
import { createConnection } from '@shared/database';
import { Movie } from '../entities/Movie';
import { IMovieRepository } from './MovieRepository.interface';
import { IIndexMoviesDTO } from './dto/IndexMoviesDTO';

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

  async index({
    limit,
    page,
    title,
  }: IIndexMoviesDTO): Promise<[Movie[], number]> {
    const [
      { rows },
      {
        rows: [{ count: total }],
      },
    ] = await Promise.all([
      this.client.query(
        `SELECT * FROM movies WHERE LOWER(title) ~~ $1 LIMIT $2 OFFSET $3`,
        [`%${title.toLowerCase()}%`, limit, (page - 1) * limit],
      ),
      this.client.query(
        `SELECT COUNT(*) FROM movies WHERE LOWER(title) ~~ $1`,
        [`%${title.toLowerCase()}%`],
      ),
    ]);

    return [rows, parseInt(total, 10)];
  }

  findById(id: string): Promise<Movie | undefined> {
    throw new Error('Method not implemented.');
  }
}

export { MovieRepository };
