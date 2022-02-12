import dotEnvConfig from '@/config/dot-env-config';
import { Application } from 'express';
import expressLoader from './express-loader';

const loaders = async (app: Application): Promise<void> => {
  dotEnvConfig();
  console.info(`NODE_ENV=${process.env.NODE_ENV}, dotenv success`);
  expressLoader(app);
  console.info('express load');
};

export default loaders;
