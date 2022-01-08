const {Client} = require('pg');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const qs = require('qs');
const redis = require('redis');
const redisClient = redis.createClient();


dotenv.config({path : path.join(__dirname, "../../.env")});

const secretKey = process.env.TOKEN_SCRETKEY;
const config = {
    user: process.env.DB_USER,
    host : process.env.DB_HOST,
    database : process.env.DB_NAME,
    password : process.env.DB_PASSWORD,
    port : process.env.DB_PG_PORT,
};

exports.OauthLogin = async(req,res) =>{
    const platform = req.body.platform;
    const code = req.body.code;
    const state = req.body.state;

    const accessToken = await getAccessToken(code, platform, state);
    const userInfo = await getUserInfo(accessToken, platform);
    if(await isDuplicated(userInfo,platform)){     // 이미 다른 플랫폼으로 가입한 적이 있다면
        return res.send({
            success : false,
            message : "duplicatied user"
        })
    }
    else{
        const jwtToken = await getJwtToken(userInfo, platform);
        const refreshToken = await getRefreshToken();
        const refreshKey = await ((jwt.decode(jwtToken, secretKey)).id);

        await redisClient.on("error", (err) => {
        console.log(err);
        })
        await redisClient.connect();        
        await redisClient.set(refreshKey, refreshToken);
        await redisClient.expire(refreshKey,60*60*24*365);
        await redisClient.disconnect();
        return res.send({
            "success" : true,
            "token" : jwtToken,
            "refreshToken" : refreshToken,
            "expires_in" : 60000 //21540000
        });
    }
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

const isDuplicated = async(userInfo, platform) =>{ // 다른 플랫폼으로 가입한 적이 있는지 체크
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
        if(query.rows[0].platform != platform && query.rowCount != 0) 
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
            const date = new Date();
            date.setHours(date.getHours()+9);
            nickname = await getUserNickname();
            await client.query('INSERT INTO service.user_information (id, nickname, phone_number, sponsor, platform, created_at) VALUES($1,$2,$3,$4,$5,$6);',[id, nickname,phone_number,"N", platform, date]);
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

exports.tokenVerify = async(req,res,next) => {
    try{
        const userinfo = await jwt.verify(req.headers.authorization, secretKey);
        req.id = userinfo.id;
        req.nickname = userinfo.nickname;

        return next();
    }
    catch(err){ 
        console.log(err);
        if(err.message == "jwt expired"){
            return res.send({
                success : false,
                message : "토큰을 새로 발급해주세요."
            })
        }

        return res.send({                                                              // invalid한 token일 경우
            success : false,
            message : "로그인이 필요합니다."
        });
    }
}

exports.creatState = async(req,res) =>{
    const result = {"state" : Math.random().toString(36).slice(2)}
    return res.send(result);
}

exports.getNewToken = async(req,res)=>{
    try{        
        if(req.headers.refreshtoken == undefined || req.headers.authorization == undefined){
            return res.send({
                success : false,
                message : "refresh이나 access token이 필요합니다"
            })
        }                                                                    
        await jwt.verify(req.headers.authorization, secretKey);                     //access token이 아직 만료되지 않았을 경우
        try{
            const userinfo = await jwt.decode(req.headers.authorization,secretKey);
            const id = userinfo.id;
            const redisClient = await redis.createClient();
            await redisClient.on("error", (err) => {
                console.log(err);
            })
            await redisClient.connect();
            if(await redisClient.exists(id)){                                                      // refresh 토큰이 있으면
                const refreshToken = await redisClient.get(id);
                await redisClient.disconnect();      
                if(req.headers.refreshtoken == refreshToken){                       // 프론트에서 보낸 토큰과 redis에 저장된 토큰을 비교해서 일치한다면
                    jwt.verify(refreshToken,secretKey);                             // refresh token verify

                    const jwtToken = jwt.sign({
                        "id" : id,
                        "nickname" : userinfo.nickname,
                        "sponsor" : userinfo.sponsor,
                        "platform" : userinfo.plaWWtform
                    },
                    secretKey,
                    {
                        expiresIn : "360m",
                        issuer : "UDR"
                    })

                    return res.send({
                        success : true,
                        message : "새로운 토큰이 발급되었습니다.",
                        token : jwtToken,
                        expires_in : 21540000
                    })
                }
                else{                                                        //프론트 보낸 토큰과 redis에 저장된 토큰이 다를 때
                    return res.send({                                               
                        success : false,
                        message : "로그인이 필요합니다."
                    })
                }
            }
            else{                                                           //redis에 해당 refresh token이 없을 경우
                return res.send({
                    success : false,
                    message : "로그인이 필요합니다."
                })
            }

        }
        catch(error){                                                       // refresh token이 만료됐을 경우
            if(error.message = "jwt expired"){
                return res.send({
                    success : false,
                    message : "로그인이 필요합니다."
                })
            }
        }
    }
    catch(err){ 
        if(err.message == "jwt expired"){                                   // access token이 만료됐을 경우
            try{
                const userinfo = await jwt.decode(req.headers.authorization,secretKey);
                const id = userinfo.id;
                const redisClient = await redis.createClient();
                await redisClient.on("error", (err) => {
                    console.log(err);
                })
                await redisClient.connect();
                if(await redisClient.exists(id)){                                                      // refresh 토큰이 있으면
                    const refreshToken = await redisClient.get(id);
                    await redisClient.disconnect();      
                    if(req.headers.refreshtoken == refreshToken){                       // 프론트에서 보낸 토큰과 redis에 저장된 토큰을 비교해서 일치한다면
                        jwt.verify(refreshToken,secretKey);                             // refresh token verify

                        const jwtToken = jwt.sign({
                            "id" : id,
                            "nickname" : userinfo.nickname,
                            "sponsor" : userinfo.sponsor,
                            "platform" : userinfo.plaWWtform
                        },
                        secretKey,
                        {
                            expiresIn : "360m",
                            issuer : "UDR"
                        })

                        return res.send({
                            success : true,
                            message : "새로운 토큰이 발급되었습니다.",
                            token : jwtToken,
                            expires_in : 21540000
                        })
                    }
                    else{                                                        //프론트 보낸 토큰과 redis에 저장된 토큰이 다를 때
                        return res.send({                                               
                            success : false,
                            message : "로그인이 필요합니다."
                        })
                    }
                }
                else{                                                           //redis에 해당 refresh token이 없을 경우
                    return res.send({
                        success : false,
                        message : "로그인이 필요합니다."
                    })
                }
            }
            catch(e){                                                        // refresh token도 만료됐을 경우
                if(e.message == "jwt expired"){
                    return res.send({
                        success : false,
                        message : "로그인이 필요합니다."
                })
                }
            }
        }

        console.log(err);
        return res.send({                                                              // invalid한 token일 경우
            success : false,
            message : "유효하지 않은 token"
        });
    }

}

const getUserNickname = async()=>{
    const list = ['아싸인척 하는','과제하기 싫은', '과제가 많은', '연애가 하고 싶은', '알바가기 싫은', '학고 받은', '대학원생', '밤샘 중인', 'CC 중인', '종강하고 싶은'];
    const rand = Math.floor(Math.random() * list.length);
    return list[rand] + ' 우대리';
}