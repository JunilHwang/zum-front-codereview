import express from 'express';
import dotenv from 'dotenv';

import APIRouter from './src/routes/index.js';

dotenv.config();
const app = express();

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader(
      'Access-Control-Allow-Origin',
      process.env.CLIENT_ORIGIN as string,
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, UPDATE, DELETE');
    next();
  },
);
app.use(express.json());

app.use('/api', APIRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening Port : ${PORT}`);
});
