const {Client} = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path : path.join(__dirname, "../.env")});

const config = {
    user: process.env.DB_USER,
    host : process.env.DB_HOST,
    database : process.env.DB_NAME,
    password : process.env.DB_PASSWORD,
    port : process.env.DB_PG_PORT,
};

exports.getRandom = async(req,res) =>{
    // 랜덤메뉴 가져오기 
    const category = req.params.food_category;
    const client = new Client(config);

        try{
            await client.connect();
            const query = await client.query('SELECT store_name FROM store_information INNER JOIN m_category ON m_category.m_category_index = store_information.m_category_index AND m_category.name =$1;',[category]);
            client.end();
            const rand = Math.floor(Math.random() * query.rowCount);
            const result = {
                "success" : true,
                "category" : category,
                "store" : query.rows[rand].store_name,
                "main_menu" : query.rows[rand].main_menu
            }
            console.log(result);
            return res.send(result);
        }
        catch(err){
            console.log(err);
            const result = { "success" : false }
            return res.send(result);
        }
}

exports.getStoreList = async(req,res) =>{
    // 가게목록 가져오기
    const result = { 
        "success" : false,
        "list" : null
    }

    const client = new Client(config);
    const category = req.params.m;
        try{
            await client.connect();
            const query = await client.query('SELECT store_information.store_name, store_information.image_url  FROM store_information INNER JOIN m_category ON m_category.name =$1 AND m_category.m_category_index = store_information.m_category_index;',[category]);
            client.end();
            result.success= true;
            result.list = query.rows;
            return res.send(result);
        }
        catch(err){
            console.log(err);
            return res.send(result);
        }
}

exports.getStoreInformation = async(req,res) =>{
    // 가게 정보(위치, 전화번호 등) 가져오기
    const client = new Client(config);
    const store_name = req.params.name;

        try{
            await client.connect();
            const query = await client.query('SELECT * FROM public.store_information WHERE store_name = $1;',[store_name]);
            client.end();
            const result = { 
                "success" : true,
                "store" : query.rows[0].store_name,
                "call_number" : query.rows[0].call_number,
                "opening_hours" : query.rows[0].opening_hours,
                "day_off " : query.rows[0].day_off,
                "prices" : query.rows[0].prices,
                "location" : query.rows[0].location
            }
            return res.send(result);
    
        }
        catch(err){
            console.log(err);
            const result = { "success" : false }
            return res.send(result);
        }
}


exports.getLargeCategory = async(req,res) =>{
    // 대분류 가져오기
    const result = {
        "success" : false,
        "list" : null
    };
    const client = new Client(config);
        try{
            await client.connect();
            const query = await client.query("SELECT name, icon_url FROM public.l_category;");
            client.end();
            result.success = true;
            result.list = query.rows;
            return res.send(result);
        }
        catch(err){
            console.log(err);
            return res.send(result);
        }
}

exports.getMiddleCategory = async(req,res) =>{
    // 중분류 가져오기
    const result = {
        "success" : false,
        "list" : null
    }
    const largeCategory = req.params.l;
    const client = new Client(config);
        try{
            await client.connect();
                const query = await client.query("SELECT m_category.name, m_category.icon_url FROM m_category INNER JOIN l_category ON l_category.name = $1 AND m_category.l_category_index = l_category.l_category_index;",[largeCategory]);
                client.end();
                result.success = true;
                result.list = query.rows;
                return res.status(200).send(result);
            }
        catch(err){
            console.log(err);
            return res.send(result);
        }
}

exports.getStoreMenu = async(req,res) =>{
    //메뉴목록 가져오기
    const result = {
        "success" : false,
        "list" : null
    }
    const store_name = req.params.name;
    const client = new Client(config);

        try{
            await client.connect();
            const query = await client.query("SELECT menu_name, brief_info, price, store_menu.image_url FROM store_menu INNER JOIN store_information ON store_information.store_name = $1 AND store_information.store_info_index = store_menu.store_info_index;",[store_name]);
            client.end();
            result.success = true;
            result.list = query.rows;
            return res.status(200).send(result);

        }
        catch(err){
            console.log(err);
            return res.send(result);
        }
}

exports.getReview = async(req,res) =>{
    const result ={
        "success" : false,
        "list" : null
    }
    const store = req.params.name;
    const client = new Client(config);
    let order;
    if(req.body.order_type == "최신순"){
        order = 'writed_at';
    }
    else{
        order = 'star_rating';
    }
    try{
        await client.connect();
            const review = await client.query("SELECT nickname, star_rating, review, writed_at FROM store_review INNER JOIN store_information ON store_information.store_name = $1 AND store_information.store_info_index = store_review.store_info_index ORDER BY " + order +" DESC;",[store]);
            client.end();
            result.success = true;
            console.log(review);
            result.list = review.rows;
            return res.send(result);
    }
    catch(err){
        console.log(err);
        return res.send(result);
    }
}

exports.createReview = async(req,res) =>{
    const result ={
        "success" : false,
    }
    const store = req.params.name;
    const nickname = req.nickname;
    const review = req.body.review;
    const star_rating = req.body.star_rating;
    const client = new Client(config);

        try{
            await client.connect();
            const index = await client.query("SELECT store_info_index FROM public.store_information WHERE store_name = $1",[store]);
            await client.query("INSERT INTO public.store_review (store_info_index, nickname, star_rating, review, writed_at) VALUES($1, $2, $3, $4, $5);",[index.rows[0].store_info_index, nickname, star_rating, review, new Date()]);
            client.end();
            result.success = true;
            return res.send(result);
        }
        catch(err){
            console.log(err);
            return res.send(result);
        }
}