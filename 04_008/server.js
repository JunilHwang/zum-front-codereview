const express = require("express");
const path = require("path");
const app = express();

//webpack 미들웨어 사용
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const { appendFile, fstat } = require("fs");
const compiler = webpack(webpackConfig);
//bodyPaser 사용
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))
//method-override 라이브러리
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
}))

//세션 저장
const session = require('express-session');
app.use(session({ secret: '비밀코드', resave: true, saveUninitialized: false }));

//포트번호 3000
app.set("port", 3000);
app.listen(app.get("port"), () => {
  console.log("http://localhost:" + app.get("port"));
});

const fs = require('fs'); //파일모듈 불러오기);
const { splice } = require("core-js/core/array");

//bundle된 index.ejs '/' 주소로 요청
app.set('view engine', 'ejs');
app.get('/', function (요청, 응답) {
  응답.render(path.resolve('index.ejs'));
});

app.get('/write', function (요청, 응답) {
  fs.readFile(__dirname + "/src/data.json", 'utf8', function(에러, 결과){
    var posts = JSON.parse(결과);
    응답.render('write.ejs',{posts});
  })
});

/* write 에서 /add로 post 포스트 발행(요청)시 */
app.post('/create',function(요청, 응답){
  const data = fs.readFileSync(__dirname + "/src/data.json")
  const dataObj = JSON.parse(data)
  const updateJSON = JSON.stringify(요청.body)
  const parseJSON = JSON.parse(updateJSON)
  parseJSON.id = dataObj.datas.length; //id 값 주기 
  dataObj.datas.push(parseJSON);
  var updateData = JSON.stringify(dataObj);
  fs.writeFile(__dirname + "/src/data.json", updateData, function(에러,결과){
    if(에러) throw 에러;
    console.log("new data added")
  })
  응답.render('create.ejs',{newData : parseJSON});
})

//json 데이터 읽기
app.get('/posts', function(요청,응답){
  fs.readFile(__dirname + "/src/data.json", 'utf8', function(에러, 결과){
    if (에러) {
      console.log(에러)
      응답.status(500).send('server error')
    }
    let posts = JSON.parse(결과);
    console.log(posts);
    응답.render('posts.ejs',{posts : posts});
  })
})

//상세페이지
app.get('/posts/:id', function(요청,응답){
  const id = 요청.params.id
  fs.readFile(__dirname + "/src/data.json", 'utf8', function(에러, 결과){
    if (에러) {
      console.log(에러)
      응답.status(500).send('server error')
    }
    let posts = JSON.parse(결과);
    let filterPosts = posts.datas[id];
    응답.render('detail.ejs', {detail : filterPosts});
  })
})

//글 수정
app.get('/edit/:id', function(요청,응답){
  const id = 요청.params.id;
  fs.readFile(__dirname + "/src/data.json", 'utf8', function(에러, 결과){
    if (에러) {
      console.log(에러)
      응답.status(500).send('server error')
    }
    let posts = JSON.parse(결과);
    let filterPosts = posts.datas[id];
    console.log(filterPosts)
    응답.render('edit.ejs', {edit : filterPosts});
  })
})
//글 수정후
app.put('/edit/:id', function(요청,응답){
  const id = 요청.params.id;
  
  fs.readFile(__dirname + "/src/data.json", 'utf8', function(에러, 결과){
    if (에러) {
      console.log(에러)
      응답.status(500).send('server error')
    }
    let posts = JSON.parse(결과);
    let updateposts = posts.datas[id];
    if(updateposts){
      updateposts.title = 요청.body.title;
      updateposts.date = 요청.body.date;
      updateposts.author = 요청.body.author;
      updateposts.content = 요청.body.content;
    }
    else{
      response.send({error:'존재하지않는 데이터!'})
    }
    console.log(posts);
  })
  응답.redirect('/posts');
})

// 글 삭제
// app.delete('/edit/:id', function(요청,응답){
//   const id = 요청.params.id;
  
//   const data = fs.readFileSync(__dirname + "/src/data.json")
//   const dataObj = JSON.parse(data)

//   dataObj.forEach((e,i)=>{
//     if( i.id === id){
//       i.splice(i,1);
//       i--;
//     }
//   })
//   응답.redirect('/posts')
})

// //API 관리하기
// function getData() {/* JSON 파일을 읽어옴 */ }
// function setData(data) {/* JSON 파일을 저장함 */ }

// app.post("/posts", (요청, 응답) => {
//   const posts = getData();
//   posts.push(요청.body);
//   setData(posts);
//   응답.send();
// });

// app.get("/posts", (요청, 응답) => {
//   응답.send(getData());
// })

// /** 구현 코드 **/
// app.listen();
