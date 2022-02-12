import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import corsConfig from '@/config/cors-config';

const expressLoader = (app: Application): void => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(cors(corsConfig()));
  app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
};

export default expressLoader;
