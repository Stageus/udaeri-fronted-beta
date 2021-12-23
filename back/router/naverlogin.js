var express = require('express');
var app = express();
var fetch = require('node-fetch');
const request = require('request');
const url = require('url');
const qs = require('qs');
const jwt = require('jsonwebtoken');
const secretKey = "abcd";

/*var client_id = 'TtMZfjScaNLpNbVdlfRJ';
var client_secret = '0E9Ki0x4qz';
var state = "RANDOM_STATE";
var redirectURI = encodeURI("https://3.12.241.33:8443/callback");
var api_url = "";
app.get('/naverlogin', function (req, res) {
  console.log(redirectURI);
  api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;
   res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
   res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
 });
 app.get('/callback', function (req, res) {
  code = req.query.code;
  state = req.query.state;
  api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
   + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
  var request = require('request');
  var options = {
      url: api_url,
      headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
   };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  });
});
  app.listen(3000, function () {
    console.log('http://127.0.0.1:3000/naverlogin app listening on port 3000!');
  });*/

  app.get('/kakaologin', async(req,res)=>{
    res.redirect('https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=02be3f8588228d4a03f6f2b0c0cf2d7f&redirect_uri=https://3.12.241.33:8443/callback')
  })

  app.get('/callback', async(req,res)=>{
    res.send("로그인 하는 중입니다.");
  })

  app.get('/naver/callback', async(req,res)=>{
    res.send("로그인 하는 중입니다.");
  })

  app.get('/kakao/logout', (req,res)=>{
      return res.send("로그아웃아 돼라~");
  })

  const getAccessToken = async (code) => {
    try {
            return await fetch('https://kauth.kakao.com/oauth/token', {
                method: 'POST',
                headers: {
                    'content-type':'application/x-www-form-urlencoded;charset=utf-8'
                },
                body: qs.stringify({
                    grant_type: 'authorization_code',
                    client_id: '02be3f8588228d4a03f6f2b0c0cf2d7f',
                    redirectUri: 'https://3.12.241.33:8443/callback',
                    code: code,
                }),
            }).then(res => res.json());
    }catch(e) {
      console.log(e);
    }
};

const getKakaoToken = async(accessToken) =>{
  try{
    return fetch('https://kapi.kakao.com/v2/user/me',{
      method : "POST",
      headers : {
        "Content-Type" : "application/x-www-form-urlencoded;charset=utf-8",
        "Authorization" : `Bearer ${accessToken.access_token}`,
      },
      data : qs.stringify({
        property_keys : ["properties.nickname", "properties.supported"]
      })
    }).then(res => res.json());
  }
  catch(e){ console.log(e);}

}

const getJwtToken = async(kakaoToken) =>{
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


 module.exports = app

 

 