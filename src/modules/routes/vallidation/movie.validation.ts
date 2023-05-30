import { celebrate, Joi, Segments } from 'celebrate';

export const createMovieMiddleware = celebrate({
  [Segments.BODY]: {
    title: Joi.string().required(),
    year: Joi.string().length(4).required(),
    runtime: Joi.number().integer().min(1).positive().required(),
    genres: Joi.array().items(Joi.string()).required(),
    director: Joi.string().required(),
    active: Joi.boolean().default(true),
  },
});

export const indexMoviesMiddleware = celebrate({
  [Segments.QUERY]: {
    title: Joi.string(),
    genres: Joi.array().items(Joi.string()).default([]),
    page: Joi.number().integer().min(1).positive().default(1),
    limit: Joi.number().integer().min(1).positive().default(10),
  },
});