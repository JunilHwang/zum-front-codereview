const express = require('express');

const PORT = 1010;
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// 목업 데이터? 
let postsData = [
        {
            "id": 1,
            "title": "제목",
            "content": "내용",
            "Writer": "글쓴이",
            "date": "2022-02-16"
        },
        {
            "id": 2,
            "title": "제목2",
            "content": "내용2",
            "Writer": "글쓴이2",
            "date": "2022-02-17"
        },
        {
            "id": 3,
            "title": "제목3",
            "content": "내용3",
            "Writer": "글쓴이3",
            "date": "2022-02-18"
        },
    ];

// 포스트 리스트 가져오기
app.get('/boardData', async (req, res) => {
    const data = postsData;
    res.status(200).send(data)
    //res.send(postsData);
})

// 포스트 작성 데이터 넣기
app.post('/sendData', (req, res) => {    
    dataLength = postsData.length
    let DataMap = {"id": dataLength+1}    
    postsData.push(Object.assign(DataMap, req.body));
    res.status(200).send({msg: "성공"})
})

// 해당 포스트를 가져오기 위한 파라미터 받기
app.get('/oneBoardData/:id', (req, res) => {
    const params = req.params 
    const id = params.id
    const data = postsData.filter(v => v.id == id)
    res.status(200).send(data)
})

// 포스트 수정
app.put('/editData/:id', (req, res) => {
    const params = req.params 
    const id = params.id
    const index = ( Number(req.body.id) -1 )
    postsData.splice(index,1, req.body )    
    res.status(200).send({msg: "성공"})
})
// 포스트 삭제 
app.delete('/delData/:id', (req, res) => {
    const params = req.params 
    const id = params.id
    postsData = postsData.filter(v => v.id != id)
    res.status(200).send({msg: "성공"})
})

// 파라미터가 있는 포스트리스트조회
app.get('/paramBoardData/:sortOption/:searchOption', (req, res) => {
    const params = req.params 
    const sortOption = params.sortOption        
    const searchOption = params.searchOption
    if(searchOption != 'null'){
        postsData = postsData.filter(v=> v.title.includes(searchOption))
    }
    if(sortOption === "up"){        
        postsData.sort((a, b) => { 
            let astrArr = a.date.split('-');
            let bstrArr = b.date.split('-');
            let a_date = new Date(astrArr[0], astrArr[1]-1, astrArr[2]);           
            let b_date = new Date(bstrArr[0], bstrArr[1]-1, bstrArr[2]);           
            return a_date - b_date
        })
    } else{
        postsData.sort((a, b) => {     
            let astrArr = a.date.split('-');
            let bstrArr = b.date.split('-');
            let a_date = new Date(astrArr[0], astrArr[1]-1, astrArr[2]);           
            let b_date = new Date(bstrArr[0], bstrArr[1]-1, bstrArr[2]);          
            return b_date - a_date
        })
    }

    const data = postsData;
    res.status(200).send(data)
})


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})