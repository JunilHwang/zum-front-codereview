const express = require('express');
const app = express();
const router = require('./router/router');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
    res.render('index.html');
});

app.use('/api', router);

const server = app.listen(3000, function () {
    console.log('start server');
});
