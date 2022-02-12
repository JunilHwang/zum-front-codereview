import express, { Application } from 'express';
import errorMiddleware from '@/middlewares/error-middleware';
import loaders from './loaders';
import router from './routes';
import CustomError from './error/custom-error';
import { NOT_FOUND_ERROR } from './constants/error';

class App {
  app: Application;

  constructor() {
    this.app = express();
    this.setLoaders();
    this.setRouter();
    this.setNotFoundHandler();
    this.setErrorMiddleware();
  }

  async setLoaders() {
    await loaders(this.app);
  }

  setRouter() {
    this.app.use('/api', router);
  }

  setNotFoundHandler() {
    this.app.all('*', (_req, _res, next) => {
      next(new CustomError(NOT_FOUND_ERROR));
    });
  }

  setErrorMiddleware() {
    this.app.use(errorMiddleware);
  }
}

export default App;
