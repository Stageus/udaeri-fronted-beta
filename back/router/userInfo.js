const secretKey = "chiken";
const jwt = require('jsonwebtoken');
const path = require('path');
const apiRecord = require('./apirecord');
const router = require('express').Router();


router.post('',(req,result)=>{
    try{
    req.decoded = jwt.verify(req.headers.auth, secretKey);
    
    const user_info = req.decoded;
    result.send(user_info);
    }
    catch(error){
        if(error.name == "TokenExpiredError" ){
            user_info = false;
            result.send(user_info);
        }
    }
}); 


/*router.post('',(req,result)=>{ 

    const client = new Client({
        user : 'stageus',
        host : 'localhost',
        database : 'week1',
        password : '1234',
        port : '5432',
    });
    client.connect();

    let id = "rkawk529";
    client.query('SELECT * FROM public.data WHERE user_id = $1;', [id], (err, res)=>{
        if(!err){
        result.send(res.rows);
        }
        client.end();
    })
}); */

/*router.post('',(req,res)=>{  //api를 만드는 명령어 get - get은 백에서 값을 가져올 때 쓰는 명령어(클라에서 값 가져올 수 없음 <-> post)
    let id = req.body.id; //body라는 이름의 json에 id value를 받음
    let password = req.body.password;

    const result ={
        "success" : false
    }

    if(id =="stageus" && password == "1234"){
        result.success = ture;
    }
    else{
        result.success = false;
    }
    res.send(result);
}); */

module.exports = router //다른 곳에서 router api를 가져다 쓸 수 있게 하는 명령어

