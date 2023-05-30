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
    genres,
  }: IIndexMoviesDTO): Promise<[Movie[], number]> {
    const whereClause =
      '(LOWER(title) ~~ $1 OR $2::text IS NULL) AND (genres @> $3 OR array_length($3, 1) = 0)';

    const query = `SELECT * FROM movies WHERE ${whereClause}`;

    const params = [`%${title?.toLowerCase()}%`, title, genres];

    const [
      { rows },
      {
        rows: [{ total }],
      },
    ] = await Promise.all([
      this.client.query(`${query} LIMIT $4 OFFSET $5`, [
        ...params,
        limit,
        (page - 1) * limit,
      ]),
      this.client.query(
        `SELECT COUNT(*)::int as total FROM movies WHERE ${whereClause}`,
        params,
      ),
    ]);

    return [rows, total];
  }

  async findById(id: string): Promise<Movie | undefined> {
    const { rows } = await this.client.query(
      'SELECT * FROM movies WHERE id = $1',
      [id],
    );

    return rows[0];
  }

  async delete(id: string): Promise<void> {
    await this.client.query('DELETE FROM movies WHERE id = $1', [id]);
  }
}

export { MovieRepository };
