const express = require("express");
const route = express.Router();
const path = require("path");

route.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, "../index.html"));
})

route.get('/callback', (req,res)=>{
    res.sendFile(path.join(__dirname,"../loading.html"));
})

route.get('/naver/callback', (req,res)=>{
    res.sendFile(path.join(__dirname,"../loading.html"));
})


module.exports = route