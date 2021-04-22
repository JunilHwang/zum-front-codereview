import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { applyRouter } from '@/router';
import { statusCode } from '@/common/statusCodes';

const app = express();

app.use(json());

app.use(cors());

applyRouter(app);

app.use((req: Request, res: Response) => {
  res.sendStatus(statusCode.notFound);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(statusCode.serverError).json({ message: err.message });
});

app.listen(3000);
