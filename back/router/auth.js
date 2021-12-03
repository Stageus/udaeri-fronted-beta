const {Client} = require('pg');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

dotenv.config({path : path.join(__dirname, "../.env")});

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
                const query = await client.query("SELECT id, password FROM public.user_information WHERE id = $1;",[id]);
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


exports.CreateToken = async(req,res) =>{

    const client = new Client(config);
    const id = req.body.id;
    const result = {
        "success" : false,
        "token" : null
    }

        try{
            await client.connect();
                const query = await client.query("SELECT nickname FROM public.user_information WHERE id = $1;",[id]);
                const udrToken = jwt.sign({
                    id : id,
                    nickname : query.rows[0].nickname
                },
                secretKey,
                {
                    expiresIn : "20m",
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
            const query =  await client.query("SELECT password FROM public.user_information WHERE id = $1;",[id]);
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
