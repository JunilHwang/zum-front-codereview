import express from 'express';
import indexRouter from './routes';
const app = express();

app.use('/', indexRouter);
app.listen(3000, () => console.log('listening on port 3000'));
