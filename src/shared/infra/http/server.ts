import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import '@shared/infra/typeorm';
import { errors } from 'celebrate';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';
import routes from './routes';
import '@shared/container';

const app = express();
app.use(rateLimiter);
app.use(express.json());
// Disponibiliza a imagem estaticamente usando localhost:3333/files/imgname
app.use('/files', express.static(uploadConfig.uploadFolder));
app.use(routes);

app.use(errors());
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
