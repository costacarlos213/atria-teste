import { celebrate, Joi, Segments } from 'celebrate';

const createMovieMiddleware = celebrate({
  [Segments.BODY]: {
    title: Joi.string().required(),
    year: Joi.string().length(4).required(),
    runtime: Joi.number().integer().min(1).positive().required(),
    genres: Joi.array().items(Joi.string()).required(),
    director: Joi.string().required(),
    active: Joi.boolean().default(true),
  },
});

export { createMovieMiddleware };
