const express = require('express');
const cors = require('cors');

const app = express();
const port = 4000;

const indexRouter = require('./routes/index');
const contentsRouter = require('./routes/contents');

const corseOptions = {
  origin: ['https://localhost:3000', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true, // 쿠키 사용시
  optionsSuccessStatus: 204, // Cors 요청 성공 시 204로 응답(옵션)
};

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // 중첩 객체 표현
app.use(cors(corseOptions));

app.use('/', indexRouter);
app.use('/contents', contentsRouter);

const server = app.listen(port, () =>
  console.log(`포트번호${port} HTTP 서버시작`),
);

module.exports = server;
