const {Client} = require('pg');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

dotenv.config({path : path.join(__dirname, "../../.env")});

const secretKey = process.env.TOKEN_SCRETKEY;
const config = {
    user: process.env.DB_USER,
    host : process.env.DB_HOST,
    database : process.env.DB_NAME,
    password : process.env.DB_PASSWORD,
    port : process.env.DB_PG_PORT,
};


exports.login = async(req,res,next) =>{
    const id = req.body.id;
    const password = req.body.password;
    const result = {
        "success" : false
    }
    const client = new Client(config);

        try{
            await client.connect();
                const query = await client.query("SELECT id, password FROM service.user_information WHERE id = $1;",[id]);
                client.end();
                if(query.rowCount != 0){
                    if(await bcrypt.compare(password, query.rows[0].password)) return next();
                    else return res.send(result);
                }
                else{
                    return res.send(result);
                }
        }
        catch(err){
            console.log(err);
            res.send(result);
        }
        
}

exports.OauthLogin = async(req,res,next) =>{
    const platform = req.body.platform;
    const code = req.body.code;

    const accessToken = await getAccessToken(code, platform);
    const userInfo = await getUserInfo(accessToken, platform);
    const jwtToken = await getJwtToken(userInfo, platform);
    return res.send(jwtToken);
}

const getAccessToken = async(code, platform) =>{
    let url;
    try{
    switch(platform){
        case "kakao":
            return await fetch('https://kauth.kakao.com/oauth/token', {
                method: 'POST',
                headers: {
                    'content-type':'application/x-www-form-urlencoded;charset=utf-8'
                },
                body: qs.stringify({
                    grant_type: 'authorization_code',
                    client_id: process.env.KAKAO_CLIENT_ID,
                    redirectUri: process.env.KAKAO_REDIRECT_URI,
                    code: code,
                }),
            }).then(res => res.json());

        case "naver":
            url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
            + process.env.NAVER_CLIENT_ID + '&client_secret=' + process.env.NAVER_CLIENT_SECERT + '&redirect_uri=' + process.env.NAVER_REDIRECT_URI + '&code=' + code + '&state=' + process.env.NAVER_STATE;

            return fetch(url,{
                method : 'GET',
                headers : {
                    'X-Naver-Client-Id':client_id, 
                    'X-Naver-Client-Secret': process.env.CLIENT_SECERT
                }
            }).then(res => res.json())

        case "google":
            break;
    }
    }
    catch(e){
        console.log(e);
    }

}

const getUserInfo = async(accessToken, platform) =>{

    switch(platform){
        case "kakao" :
            return fetch('https://kapi.kakao.com/v2/user/me',{
                method : "POST",
                headers : {
                    "Content-Type" : "application/x-www-form-urlencoded;charset=utf-8",
                    "Authorization" : `Bearer ${accessToken.access_token}`,
                },
                }).then(res => res.json());
                
        case "naver" :
            return fetch('https://openapi.naver.com/v1/nid/me', {
                method : "GET",
                headers : {
                    "Authorization" : `Bearer ${accessToken.access_token}`
                }
            }).then(res => res.json());

        case "google" :
            break;
            
    }


}

const getJwtToken = async(userInfo, platform) =>{
  const jwtToken = jwt.sign({
    id : kakaoToken.id,
    nickname : kakaoToken.properties.nickname,
    supported : kakaoToken.properties.supported
  },
  secretKey,
  {
      expiresIn : "5m",
      issuer : "UDR"
  })
  return jwtToken;
}


exports.CreateToken = async(req,res) =>{

    const client = new Client(config);
    const id = req.body.id;
    const result = {
        "success" : false,
        "token" : null
    }

        try{
            await client.connect();
                const query = await client.query("SELECT nickname FROM service.user_information WHERE id = $1;",[id]);
                const udrToken = jwt.sign({
                    id : id,
                    nickname : query.rows[0].nickname
                },
                secretKey,
                {
                    expiresIn : "360m",
                    issuer : "UDR"
                })  
                result.success = true;
                result.token = udrToken;
                client.end();
                return res.send(result);
            }                
        catch(err){
            console.log(err);
            return res.send(result);
        }

}




exports.userIdentification = async(req,res,next) =>{
    const result = { "success" : false }
        try{
            const user_info = jwt.verify(req.headers.authorization , secretKey);
            const id = user_info.id;
            const password = req.body.password;
            const client = new Client(config);
            
            await client.connect();
            const query =  await client.query("SELECT password FROM service.user_information WHERE id = $1;",[id]);
            client.end();
            
            if(await bcrypt.compare(password, query.rows[0].password)){
                req.id = id;
                return next();
            }
            else{
                return res.send(result);
            }
        }
        catch(err){
            console.log(err);
            return res.send(result);
        }
}

exports.tokenVerify = async(req,res,next) => {

    try{  
        req.decoded = jwt.verify(req.headers.authorization, secretKey);
        req.id = req.decoded.id;
        req.nickname = req.decoded.nickname;
        return next();
    }
    catch(err){ 
        const result = { "success" : false };
        console.log(err);
        return res.send(result);
    }
}
