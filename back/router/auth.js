const {Client} = require('pg');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSimple = require('jwt-simple');
const fetch = require('node-fetch');
const qs = require('qs');
const redis = require('redis');


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

exports.OauthLogin = async(req,res) =>{
    const platform = req.body.platform;
    const code = req.body.code;
    const state = req.body.state;

    const accessToken = await getAccessToken(code, platform, state);
    const userInfo = await getUserInfo(accessToken, platform);
    const jwtToken = await getJwtToken(userInfo, platform);
    const refreshToken = await getRefreshToken();
    /*
    const red = redis.createClient();
    red.on("error", (err) => {
        console.log(err);
    })

    const refreshKey = await (jwtSimple.decoded(jwtToken, secretKey)).id;
    red.set(refreshKey, refreshToken);
*/
    return res.send({
        "success" : true,
        "token" : jwtToken,
        "refreshToken" : refreshToken
    });
    /*
    if(isDuplicate(userInfo, platform)){
            const result = {
        success : false,
        message : "duplicatied user"
    }
        return res.send(result);
    }
    else{
    }*/

}

const getAccessToken = async(code, platform, state) =>{    
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
            }).then(res => res.json())

        case "naver":
            let url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
            + process.env.NAVER_CLIENT_ID + '&client_secret=' + process.env.NAVER_CLIENT_SECRET + '&redirect_uri=' + process.env.NAVER_REDIRECT_URI + '&code=' + code + '&state=' + state;

            return await fetch(url,{
                method : 'GET',
                headers : {
                    'X-Naver-Client-Id':process.env.NAVER_CLIENT_ID, 
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
            return await fetch('https://kapi.kakao.com/v2/user/me',{
                method : "POST",
                headers : {
                    "Content-Type" : "application/x-www-form-urlencoded;charset=utf-8",
                    "Authorization" : `Bearer ${accessToken.access_token}`,
                },
                }).then(res => res.json())
                
        case "naver" :
            return await fetch('https://openapi.naver.com/v1/nid/me', {
                method : "GET",
                headers : {
                    "Authorization" : `Bearer ${accessToken.access_token}`
                }
            }).then(res => res.json());

        case "google" :
            break;
            
    }


}

const isDuplicate = async(userInfo, platform) =>{ // 다른 플랫폼으로 가입한 적이 있는지 체크
    let phone_number;

    switch(platform){
        case "kakao":
            phone_number = userInfo.phone_number;
            break;
        case "naver":
            phone_number = userInfo.response.mobile;
            break;
        case "google":
            break;
    }
    const client = new Client(config);
    try{
        client.connect();
        const query = await client.query('SELECT platform FROM service.user_information WHERE phone_number = $1;',[phone_number]);
        if(query.rows[0].platform != platform && query.rows[0].platform != undefined) 
            return true;
        else
            return false;
    }
        catch(err){
            console.log(err);
        }

}

const getJwtToken = async(userInfo,platform) =>{
    let id, nickname, sponsor, phone_number;

    switch(platform){
        case "kakao":
            id = userInfo.id;
            phone_number = userInfo.phone_number;
            break;
        case "naver":
            id = userInfo.response.id;
            phone_number = userInfo.response.mobile;
            break;
        case "google":
            break;
    }
    const client = new Client(config);
    try{
        client.connect();
        const query = await client.query('SELECT id, nickname, sponsor, platform FROM service.user_information WHERE id =$1 AND platform = $2;',[id, platform]);
        if(query.rowCount !=0){
            id = query.rows[0].id;
            nickname = query.rows[0].nickname;
            sponsor = query.rows[0].sponsor;
        }
        else{
            const query = await client.query('INSERT INTO service.user_information (id, nickname, phone_number, sponsor, platform, created_at) VALUES($1,$2,$3,$4,$5,$6);',[id, "뭐로할까닉네임..",phone_number,"N", platform, new Date()]);
            nickname = "뭐로할까 닉네임..";
            sponsor = "N";
        }

        
    const jwtToken = jwt.sign({
        "id" : id,
        "nickname" : nickname,
        "sponsor" : sponsor,
        "platform" : platform
    },
    secretKey,
    {
        expiresIn : "360m",
        issuer : "UDR"
    })

    return jwtToken;
    }
    catch(err){
        console.log(err);
    }
}

const getRefreshToken = async() =>{
    const refreshToken = jwt.sign({
    },
    secretKey,
    {
        expiresIn : "365d",
        issuer : "UDR"
    })

    return refreshToken;
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

exports.OauthLogout = async(req,res) =>{
        const platform = req.params.platform;
        const result = {success : false }

        fetch(`/oauth/logout?client_id=${process.env.KAKAO_CLIENT_ID}`,{
            method : 'GET'
        })
        .catch(err =>{
            return res.send(result);
        })
        result.success = true;
        return res.send(result);
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
    console.log("token : " +req.headers.authorization);
    console.log("\n");
    try{  
        req.decoded = await jwt.verify(req.headers.authorization, secretKey);
        req.id = req.decoded.id;
        req.nickname = req.decoded.nickname;

        return next();
    }
    catch(err){ 
        if(err.message == "jwt expired"){
            const id = await (jwtSimple.decode(req.headers.authorization, secretKey)).id;
            const red = redis.createClient();
            red.on("error", (err) => {
                console.log(err);
            })
            if(red.exists(id)){
                red.geta(id, async(err, token)=>{
                    try{
                        jwt.verify(token,secretKey);
                        const client = new Client(config);
                        client.connect();

                        const query = await client.query('SELECT nickname, sponsor, platform FROM service.user_information WHERE id = $1;'[id]);

                        const jwtToken = jwt.sign({
                            "id" : id,
                            "nickname" : query.rows[0].nickname,
                            "sponsor" : query.rows[0].sponsor,
                            "platform" : query.rows[0].platform
                        },
                        secretKey,
                        {
                            expiresIn : "360m",
                            issuer : "UDR"
                        })

                        return res.send({
                            success : false,
                            message : "새로운 토큰이 발급되었습니다.",
                            token : jwtToken
                        })
                        
                    }
                    catch(e){   // refresh token도 만료됐을 경우
                        if(e.message == "jwt expired"){
                            return res.send({
                                success : false,
                                message : "로그인이 필요합니다."
                        })
                        }
                    }
                })
            }
        }

        console.log(err);
        return res.send({
            success : false,
            message : "로그인에 실패하였습니다."
        });
    }
}

exports.creatState = async(req,res) =>{
    const result = {"state" : Math.random().toString(36).slice(2)}
    return res.send(result);
}

