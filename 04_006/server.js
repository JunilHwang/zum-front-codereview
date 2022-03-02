const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
let data = [
    { id: 1, title: "제목1", writer: '글쓴이1', contents: "내용내용1", date: "2022.1.25" },
    { id: 2, title: "제목2", writer: '글쓴이2', contents: "내용내용2", date: "2022.1.26" },
    { id: 3, title: "제목3", writer: '글쓴이3', contents: "내용내용3", date: "2022.1.27" },
    { id: 4, title: "제목4", writer: '글쓴이3', contents: "내용내용4", date: "2022.1.28" },
    { id: 5, title: "제목5", writer: '글쓴이3', contents: "내용내용5", date: "2022.1.29" },
    { id: 6, title: "제목6", writer: '글쓴이6', contents: "내용내용6", date: "2022.1.30" },
    { id: 7, title: "제목7", writer: '글쓴이6', contents: "내용내용7", date: "2022.1.31" },
    { id: 8, title: "제목8", writer: '글쓴이6', contents: "내용내용8", date: "2022.2.1" },
    { id: 9, title: "제목9", writer: '글쓴이6', contents: "내용내용9", date: "2022.2.2" },
    { id: 10, title: "제목10", writer: '글쓴이10', contents: "내용내용10", date: "2022.2.3" },
    { id: 11, title: "제목11", writer: '글쓴이11', contents: "내용내용11", date: "2022.2.4" },
    { id: 12, title: "제목12", writer: '글쓴이12', contents: "내용내용12", date: "2022.2.5" },
    { id: 13, title: "제목13", writer: '글쓴이13', contents: "내용내용13", date: "2022.2.5" }

]
var id = data.length

app.use(cors());
app.use(bodyParser.json());

//게시판 데이터 조회
app.get("/", (req, res) => {
    res.send({ data: data });
});

// /detail?id=1 1번 게시글 데이터 조회
app.get("/detail", (req, res) => {
    const id = req.query.id
    let detailData = data.filter(function (e) { return e.id == id });

    res.send({ data: detailData })

})

//  /detail?id=1 1번 게시글 데이터 삭제
app.delete("/detail", (req, res) => {
    const id = req.query.id
    const delData = data.find(e => e.id === parseInt(id));
    const index = data.indexOf(delData);
    data.splice(index, 1);

    res.send({ msg: "success" })

})
//  /modify?id=1 1번 게시글 데이터 수정
app.put("/modify", (req, res) => {
    const id = req.query.id
    const modifyData = data.find(e => e.id === parseInt(id))
    modifyData.title = req.body.title
    modifyData.writer = req.body.writer
    modifyData.contents = req.body.contents

    res.send({ msg: "success" })

})

//  /write 새로운 게시글 데이터 생성
app.post("/write", (req, res) => {
    id += 1
    let writeData = {
        id: id,
        title: req.body.title,
        writer: req.body.writer,
        contents: req.body.contents,
        date: req.body.date
    }
    data.push(writeData)
    res.send({ msg: "success", id: writeData.id })
})


app.listen(process.env.PORT || 3001, () => console.log("Server running"));