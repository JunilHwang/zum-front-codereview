import { NextFunction, Request, Response } from 'express';
import CustomError from '@/error/custom-error';
import logger from '@/config/logger';

// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  const { status, errorMessage, customMessage } = err;
  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  } else if (process.env.NODE_ENV === 'production') {
    const error = JSON.stringify(err);
    if (status < 500) logger.info(error);
    else logger.error(error);
  }
  res.status(status).json({ errorMessage: customMessage ?? errorMessage });
};

export default errorMiddleware;
