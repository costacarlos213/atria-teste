import { celebrate, Joi, Segments } from 'celebrate';

export const createMovieMiddleware = celebrate({
  [Segments.BODY]: {
    title: Joi.string().required(),
    year: Joi.number().min(1800).max(2100),
    runtime: Joi.number().integer().min(1).positive().required(),
    genres: Joi.array().items(Joi.string()).required(),
    director: Joi.string().required(),
    active: Joi.boolean().default(true),
  },
});

export const indexMoviesMiddleware = celebrate({
  [Segments.QUERY]: {
    title: Joi.string(),
    genres: [
      Joi.array().items(Joi.string()).default([]),
      Joi.string().default(''),
    ],
    page: Joi.number().integer().min(1).positive().default(1),
    limit: Joi.number().integer().min(1).positive().default(10),
  },
});

export const updateMovieMiddleware = celebrate({
  [Segments.BODY]: {
    title: Joi.string(),
    year: Joi.number().min(1800).max(2100),
    runtime: Joi.number().integer().min(1).positive(),
    genres: Joi.array().items(Joi.string()),
    director: Joi.string(),
    active: Joi.boolean(),
  },
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const showMovieMiddleware = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});
