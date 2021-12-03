const {Client} = require('pg');
const path = require('path');
const router = require('express').Router();
const apiRecord = require('./apirecord');
const md5 = require('md5');


router.post('/SignUp',(req,res)=>{ 

    const client = new Client({
        user : 'stageus',
        host : 'localhost',
        database : 'week1',
        password : '1234',
        port : '5432',
    });
    client.connect();
    
    let id = req.body.id; 
    let password = md5(req.body.password);
    let name = req.body.name;
    let email = req.body.email;
    let phone_num = req.body.phone_num;
    let address = req.body.address;
    let student_num =req.body.student_num;  
    let school_name = req.body.school_name;

    client.query('INSERT INTO public.data(user_id, password, user_name, email, phone_number, address, student_number, school_name, signup_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);',[id, password, name, email, phone_num, address, student_num, school_name, new Date()], (err, res)=>{
        console.log(err,res);
        apiRecord("SignUp", req.body);
        client.end();
    })
    
    res.redirect('/');
}); 

module.exports = router //다른 곳에서 router api를 가져다 쓸 수 있게 하는 명령어
