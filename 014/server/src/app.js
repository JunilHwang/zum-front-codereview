const express = require('express');
const app = express();
const http = require('http');
const port = 3000;
const server = http.createServer(app);

app.use(express.static(__dirname + '../../../client/dist'));
app.use('/api/', require('./routes'));
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

server.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
