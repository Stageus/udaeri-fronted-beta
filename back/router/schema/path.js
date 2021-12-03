const {Client} = require('pg');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


dotenv.config();
const secretKey = process.env.SECRETKEY;




router.post("/", (req, res)=>{
    let id = req.body.id;
    let pw = md5(req.body.pw);


    const client = new Client({
        user : 'stageus',
        host : 'localhost',
        database : 'week1',
        password : '1234',
        port : '5432',
    });
    client.connect();  

    client.query('SELECT * FROM public.data WHERE user_id = $1 AND password = $2', [id,pw], (err, resul)=>{
        try{
            if(resul.rowCount != 0){
                console.log("로그인 성공");
                apiRecord("Login", req.body);

                const userId = id;
                const userName = resul.rows[0].user_name;
                const userEmail = resul.rows[0].email;
                const userPhone = resul.rows[0].phone_number;
                const userAddress = resul.rows[0].address;
                const studentNumber = resul.rows[0].student_number;
                const userSchool = resul.rows[0].school_name;
                const userSignUpDate = resul.rows[0].signup_date;
    
                const jwtToken = jwt.sign( // 토큰을 생성하는 명령어
                {
                   id: userId,
                   name : userName,
                   email : userEmail,
                   phone : userPhone,
                   address : userAddress,
                   studentnumber : studentNumber,
                   school : userSchool,
                   signupdate : userSignUpDate
                },
                secretKey,
                {
                    expiresIn : "1m",
                    issuer : "SangMin" // 토큰 발행자
                }
    
                ) 
    
                const result = {
                    "success" : true,
                    "message" : "토큰이 발행되었습니다.",
                    "token" : jwtToken
                }
                client.end();
                res.send(result);
            } else{
                console.log("로그인 실패");
                apiRecord("login", req.body);
                const result = {
                    "success" : false,
                    "message" : "회원 정보가 잘못되었습니다.",
                }
                client.end();
                res.send(result);
            }
        }
        catch(error){
            console.log(error);
            const result = {
                "success" : false,
                "message" : "서버 문제로 토큰 발급에 실패했습니다.",
            }
            client.end();
            res.send(result);
        }
    })

    
})

router.post("/varify", (req, res)=>{

    const result = {
        "success" : false,
        "message" : ""
    }

    try{
        req.decoded = jwt.verify(req.headers.auth, secretKey); // 비교하는 부분,  오류 시 catch로 넘어감
        result.success = true;
        res.send(result);
    }
    catch(error){
        if(error.name == "TokenExpiredError"){
            result.message = "토큰이 만료되었습니다.";
        } else{
            result.message = "토큰이 유효하지 않습니다."
        }
        res.send(result);
    }
})



module.exports = router;