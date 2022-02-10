import express, { Request, Response, NextFunction } from 'express';
import controller from './controller';
const app = express();

// ==============================
// parsing bodies
// ==============================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ==============================
//logger for debug purpose
// ==============================
app.use((req: Request, res: Response, next: NextFunction) => {
  const time = new Date();
  const logBody: string = Object.keys(req.body).length ? 'body' : '';

  console.log(
    `[${time.toLocaleDateString()} ${time.toLocaleTimeString()}] ${req.ip} ${
      req.method
    } -(${logBody})- ${req.url}`
  );
  if (Object.keys(req['query']).length) console.dir(req.query);
  if (Object.keys(req['body']).length) console.dir(req.body);
  next();
});

// ==============================
// cors settings w/o libraries
// ==============================
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', req.header('Origin') || '*');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header(
      'Access-Control-Allow-Headers',
      'Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With'
    );
    res.header('Access-Control-Max-Age', '36000');
    return res.status(200).send();
  }
  next();
});

// ==============================
// crud endpoints
// ==============================
app.get('/article', controller.getList);
app.post('/article', controller.write);
app.get('/article/:id', controller.getOne);
app.put('/article/:id', controller.edit);
app.delete('/article/:id', controller.delete);

// ==============================
// Check if the server is running
// ==============================
app.get('/', (req: Request, res: Response) => {
  return res.status(200).send('API Server is active and running');
});

// ==============================
// 404 Not Found
// ==============================
app.use((req: Request, res: Response) => {
  console.log('404 Not Found - no such endpoint');
  return res.status(404).send('Not Found');
});

// ==============================
// Error handling
// ==============================
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  return res.status(500).send('Internal Server Error');
});

// ==============================
// Start the server
// ==============================
app.listen('3333', () => {
  console.log(`server is running on port 3333`);
});
