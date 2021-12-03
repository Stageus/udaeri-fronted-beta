// 서버 실행하는 코드
const express = require('express'); 
const path = require('path'); // 파일들의 경로를 쉽게 접근할 수 있게 해주는 라이브러리
const https= require('https');
const fs = require('fs'); // 파일을 임포트 할 때 씀
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config({path : path.join(__dirname, './back/.env')});

const corsOptions = {
    origin: '*',
    credentials: true,
    methods: ['POST','GET', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.options('*', cors(corsOptions));
app.use(cors(corsOptions)); 

/*const Ports = process.env.SERVER_PORT;
const options = {
    key: fs.readFileSync(path.join(__dirname, 'private.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'public.pem')),
  //ca: 보안 명서세 
};*/
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



/*app.get('*', (req,res, next)=>{
    const protocol = req.protocol; // req.protocol 사용자가 접속 할 때 쓴 주소의 맨 앞 프로토콜을 가져옴 
    if(protocol == 'https'){
        next();   // 그냥 넘어가겠다(패스)
    }
    else{
        const destination = "https://" + req.hostname + ":8443" + req.url; // req.url -> 메인페이지 이외에 접속할 때도 접속할 수 있게해줌
        res.redirect(destination);
    }
})*/

const html = require('./back/router/html');
const router = require('./back/router/router');
const naver = require('./back/router/naverlogin');
//const elastic = require('./back/router/elastic.js');

app.use(morgan('combined'));
app.use('/', html);
app.use('/',router);
app.use('/', naver);
//app.use('/elastic', elastic);

app.use((req,res)=>{
    res.status(404).send("잘못된 페이지 요청입니다.");
})

app.listen(8000, (req,res) =>{
    console.log(8000);
})
/*
https.createServer(options, app).listen(Ports, (req,res)=>{  //options에 ssl 키가 들어감
    console.log(Ports + "포트로 서버 실행");
})*/