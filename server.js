const express=require('express');
const fs=require('fs');
const static=require("serve-static");
const { grabData } = require('./crawling/grabData');

const server=express();

server.use(static(__dirname+"/build/"));

server.get("/",(req,res)=>{
    res.sendFile(__dirname+"/build/index.html");
})
server.get("/api/best",(req,res)=>{
    const jsonData=fs.readFileSync('./Data/ranking.json','utf-8');
    res.send(jsonData);
})
server.get("/api/content/:category",(req,res)=>{
    const {category}=req.params;
    let jsonData;
    switch(category){
        case "life":
            jsonData=fs.readFileSync('./Data/life.json','utf-8');
            res.send(jsonData);
            break;
        case "food":
            jsonData=fs.readFileSync('./Data/food.json','utf-8');
            res.send(jsonData);
            break;
        case "trip":
            jsonData=fs.readFileSync('./Data/trip.json','utf-8');
            res.send(jsonData);
            break;
        case "culture":
            jsonData=fs.readFileSync('./Data/culture.json','utf-8');
            res.send(jsonData);
            break;
        default:
            console.log(`${category} is Invalid category`);
            break;
    }
})

server.get("/api/detail/:url",async (req,res)=>{
    const {url}=req.params;
    const parseURL=urlParsing(url);
    const puppetter=await grabData(parseURL);
    res.send(puppetter);
})

function urlParsing(url){
    const urlTokens=url.split('_');
    return urlTokens.join('/');
}


server.listen(5000,()=>{
    console.log('server is running');
})