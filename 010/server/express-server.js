const zumJson = require('./zum.json');
const menuJson = require('./zumMenu.json');
const express = require('express');

const server = express();

const cors = require('cors');

// CORS 설정
server.use(cors());

server.get("/api/menu",(req,res) => {
    res.json(menuJson)
})

server.get("/api/zum/",(req,res) => {
    res.json(zumJson)
})

server.listen(3300,() => { ///포트번호 3000
    console.log('The server is running')
})