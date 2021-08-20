const express = require('express');
const path = require('path');
const { check } = require('./checkDetail.js');
const app = express();
const data = require('./data.js');

app.set('port', process.env.PORT || 3000);
app.set('front', process.env.FRONT || path.join(__dirname, './FrontEnd'));

app.use('/', express.static(path.join(app.get('front'), '/')));
app.use('/public', express.static(path.join(app.get('front'), '/public')));

app.use(express.json());

//기사 본문페이지(상세페이지)에서 새로고침시 index
app.get('/detail/:media/:page/:idx', (req, res) => {
  res.format({
    'text/html': () => {
      res.sendFile(path.join(app.get('front'), '/public/index.html'));
    },
  });
});

//디테일페이지 데이터 송신
app.get('/api/detail/:url', async (req, res) => {
  const url = req.params.url;
  const [media, idx] = url.split('&');
  let data = JSON.stringify(await check(`https://hub.zum.com/${media}/${idx}`));
  res.send(data);
});

//북마크 추가 요청
app.post('/api/bookmark', (req, res) => {
  const { route, id } = req.body;
  if (data.bookmark.find(el => +id === el.idx)) {
    res.send(data.bookmark);
    return;
  }
  let newBookmark = data[route].find(el => +id === el.idx);
  data.bookmark = [...data.bookmark, newBookmark];
  res.send(data.bookmark);
});

//랭킹 데이터 송신
app.get('/api/best', (req, res) => {
  const best = data['best'];
  res.send(data.best);
});

//서브페이지 데이터 송신
app.get('/api/content/:category', (req, res) => {
  const category = req.params.category;
  res.send(data[category]);
});

//페이지 라우팅
app.get('/:page', (req, res) => {
  const page = req.params.page;
  res.format({
    'text/html': () => {
      if (!data[page]) {
        res.status(406).type('html').send(`<div class="error">
        <span class="errorText errorText1">404</span>
        <span class="errorText errorText2">Not Found</span>
        <span class="errorText errorText3">The resource requested could not be found on this server</span>
        </div>`);
      } else {
        res.sendFile(path.join(app.get('front'), `/public/index.html`));
      }
    },
    'application/json': () => {
      res.send(data[page]);
    },
  });
});
//메인페이지 라우팅
app.get('/', (req, res) => {
  res.sendFile(path.join(app.get('front'), '/public/index.html'));
});
app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'is listening.....');
});
