const {Client} = require('pg');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const dotenv = require('dotenv');
const path = require('path');



dotenv.config({path : path.join(__dirname, "../../.env")});
const config = {
    user: process.env.DB_USER,
    host : process.env.DB_HOST,
    database : process.env.DB_NAME,
    password : process.env.DB_PASSWORD,
    port : process.env.DB_PG_PORT,
};



exports.CreateUser = async(req,res) => {
    // 회원 생성 
    const id = req.body.id;
    const nickname = req.body.nickname;
    const phone_number = req.body.phone_number;
    const password = req.body.password;
    const sponsor = "N";
    const result = {
        "success" : false
    }    
    const client = new Client(config);    
    try{
        await client.connect();
        const encodedPassword = await bcrypt.hash(password, saltRounds);
        await client.query('INSERT INTO service.user_information(id,nickname, password, phone_number,sponsor,created_at) VALUES($1, $2, $3, $4, $5, $6 );',[id, nickname, encodedPassword, phone_number,sponsor,new Date()])
        client.end();
    }
    catch(err){
        console.log(err);
        return res.send(result);
    }
    result.success = true;
    return res.send(result);

}

exports.DeleteUser = async(req,res)=>{
    //회원 삭제
    const client = new Client(config);
    const result = { "success" : false }
    const id = req.id;
        try{
            await client.connect();
            await client.query('DELETE FROM service.user_information WHERE id=$1',[id]);
            client.end();
            result.success = true;
            return res.status(200).send(result);
           
        }
        catch(err){
            console.log(err);
            client.end();
            return res.status(400).send(result);
        }

}

exports.UpdateUser = async(req,res)=>{
    //회원정보 업데이트
    const client = new Client(config);
    const result = { "success" : false }
    const id = req.id;
    try{
        await client.connect();
        await client.query('UPDATE service.user_information SET WHERE id = $1',[id]);
        client.end();
        result.success = true;
        return res.send(result);

    }
    catch(err){
        console.log(err);
        return res.send(result);
    }
}

exports.ReadUser = async(req,res)=>{
    //회원정보 가져오기
    const client = new Client(config);
    const user_info = {
        "id" : req.id,
        "nickname" : req.nickname
    }
    const result = { 
        "success" : false,
        "id" : user_info.id ,
        "nickname" : user_info.nickname,
        "phone_number" : "phone_number"
    }
    try{
        await client.connect();      
        const query = await client.query('SELECT phone_number FROM service.user_information WHERE id =$1',[result.id]);
        client.end();

        result.success = true;
        result.phone_number = query.rows[0].phone_number;
        return res.send(result);
        
    }
    catch(err){
        console.log(err);
        return res.send(result);
    }

}

exports.CreateUserFavorite = async(req,res) =>{
    const result = { "success" : false }
    const id = req.id;
    const store = req.body.store;
    const client = new Client(config);

        try{
            await client.connect();
            const userIndex = await client.query("SELECT user_index FROM service.user_information WHERE id = $1;", [id]);
            const storeIndex = await client.query("SELECT store_info_index FROM service.store_information WHERE store_name = $1;", [store]);
            await client.query("INSERT INTO service.user_favorite (user_index, store_info_index) VALUES ($1, $2);",[userIndex.rows[0].user_index, storeIndex.rows[0].store_info_index]);
            client.end();
            result.success = true;
            return res.status(200).send(result);
        }
        catch(err){
            console.log(err);
            return res.send(result);
        }
}

exports.DeleteUserFavorite = async(req,res) =>{
    const result = { "success" : false }
    const id = req.id;
    const store = req.body.store;
    const client = new Client(config);
    try{
        await client.connect();
        const userIndex = await client.query("SELECT user_index FROM service.user_information WHERE id = $1;", [id]);
        const storeIndex = await client.query("SELECT store_info_index FROM service.store_information WHERE store_name = $1;", [store]);
        await client.query("DELETE FROM service.user_favorite WHERE user_index = $1 AND store_info_index = $2",[userIndex.rows[0].user_index, storeIndex.rows[0].store_info_index]);
        client.end();
        result.success = true;
        return res.status(200).send(result);
    }
    catch(err){
        console.log(err);
        return res.send(result);
    }
}

exports.ReadUserFavorite = async(req,res) =>{
    const result = { 
        "success" : false,
        "list" : null
    }
    const id = req.id;
    const client = new Client(config);
        try{
            await client.connect();
            const userIndex = await client.query("SELECT user_index FROM service.user_information WHERE id = $1;", [id]);
            const favorite = await client.query("SELECT store_information.store_name, store_information.image_url FROM service.store_information WHERE store_info_index IN (SELECT store_info_index FROM service.user_favorite WHERE user_index =$1);",[userIndex.rows[0].user_index]);
            client.end();
            result.success = true;
            result.list = favorite.rows;
            return res.status(200).send(result);
        }
        catch(err){
            console.log(err);
            return res.send(result);
        }
}