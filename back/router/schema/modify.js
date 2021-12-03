const {Client} = require('pg');
const path = require('path');
const router = require('express').Router();

const client = new Client({
    user : 'stageus',
    host : 'localhost',
    database : 'week1',
    password : '1234',
    port : '5432',
});
client.connect();

router.post('',(req,result)=>{ 
    let id = req.body.id;
    let password = req.body.password;

    client.query('UPDATE public.data SET password = $1 WHERE id = $2', [password,id], (err, res)=>{
        console.log("비밀번호 변경 성공");
    })
    result.redirect('/modify');
}); 

module.exports = router //다른 곳에서 router api를 가져다 쓸 수 있게 하는 명령어

