import express, { json, Request } from 'express';
import morgan from 'morgan';
import 'express-async-errors';
import 'reflect-metadata';
import cors from 'cors';

import { LoggerStream } from '@config/winston';
import '../container';

import { globalErrorHandler } from '../middleware/globalErrorHandler';
import { router } from './routes';

const app = express();

app.use(
  cors({
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));

morgan.token('body', (req: Request) => JSON.stringify(req.body));
app.use(
  morgan(
    `:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - "body": ':body' - ":referrer" ":user-agent"`,
    {
      skip: (req, res) => res.statusCode >= 400,
      stream: new LoggerStream(),
    },
  ),
);

app.use(json());

app.use(router);

app.use(globalErrorHandler);

export { app };
