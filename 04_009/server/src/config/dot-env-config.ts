import dotenv from 'dotenv';
import path from 'path';

const matchEnv = (NODE_ENV: string) => {
  switch (NODE_ENV) {
    case 'production':
      return '.env';
    case 'test':
      return '.test.env';
    default:
      return '.dev.env';
  }
};

const dotEnvConfig = () =>
  dotenv.config({
    path: path.resolve(process.cwd(), matchEnv(process.env.NODE_ENV || 'development')),
  });

export default dotEnvConfig;
