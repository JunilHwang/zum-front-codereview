const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const api = require('./api');

app.use('/api', api);

app.set('port', process.env.PORT || 3020);

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
