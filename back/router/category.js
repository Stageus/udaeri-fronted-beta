const {Client} = require('pg');
const dotenv = require('dotenv');
const path = require('path');
const jwt = require('jsonwebtoken');

dotenv.config({path : path.join(__dirname, "../../.env")});

const config = {
    user: process.env.DB_USER,
    host : process.env.DB_HOST,
    database : process.env.DB_NAME,
    password : process.env.DB_PASSWORD,
    port : process.env.DB_PG_PORT,
};

exports.getRandom = async(req,res) =>{
    // 랜덤메뉴 가져오기 
    
    let category = req.body.categoryList;
    console.log(category);
    let q = 'SELECT store_name, main_menu, m_category.name AS name FROM service.store_information INNER JOIN service.m_category ON m_category.m_category_index = store_information.m_category_index AND m_category.name IN (';
    category.map((item, index) => {
        q = q + '\'' + item + '\'';

        index != category.length-1 ? 
        q+=',' : null;
    })

    // for(i=0; i<category.length; i++){
    //     q+='\'';
    //     q+=category[i];
    //     q+='\'';

    //     if(i!=category.length-1)
    //     q+=',';

    // }
    q+=');'
    console.log(q);
    const client = new Client(config);

        try{
            await client.connect();
            const query = await client.query(q);
            client.end();
            const rand = Math.floor(Math.random() * query.rowCount);
            const result = {
                "success" : true,
                "category" : query.rows[rand].name,
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

exports.getStoreAll = async(req,res) =>{
    // 가게목록 가져오기
    const result = { 
        "success" : false,
        "list" : null
    }    
    const all = { }
    const l_category = req.params.l;
    const m_category = req.params.m;

    const client = new Client(config);
        try{
            await client.connect();

            if(m_category == 'all'){
                const query = await client.query('WITH CT AS( SELECT *, RANK() OVER (PARTITION BY s.m_category_index ORDER BY s.store_info_index ASC) AS RN FROM service.store_information AS s) SELECT B.name AS m_name, A.store_name, A.image_url, A.main_menu, A.inha_location, A.favorited_count FROM CT A LEFT JOIN service.m_category B ON A.m_category_index = B.m_category_index LEFT JOIN service.l_category C ON B.l_category_index = C.l_category_index WHERE C.name = $1 AND A.RN <=10;',[l_category]);
                const cateogoryQuery = await client.query('SELECT A.name FROM service.m_category A INNER JOIN service.l_category B ON A.l_category_index = B.l_category_index WHERE B.name = $1;', [l_category]);

                client.end();
                
                for(i=0; i<cateogoryQuery.rowCount; i++){
                    all[cateogoryQuery.rows[i].name] = [];
                }

                for(i=0; i<query.rowCount; i++){
                    all[query.rows[i].m_name].push(query.rows[i]);
                }
                return res.send(all);
            }
            else{
                client.end();
                return res.send(result);
            }
        }
        catch(err){
            console.log(err);
            return res.send(result);
        }
}


exports.getStoreList = async(req,res) =>{
    // 가게목록 가져오기
    const result = { 
        "success" : false,
        "list" : null
    }    
    const m_category = req.params.m;
    const count = req.params.count * 10;


    const client = new Client(config);
        try{
            await client.connect();
            const query = await client.query('SELECT A.store_name, A.image_url, A.main_menu, A.inha_location, A.favorited_count FROM service.store_information A INNER JOIN service.m_category ON m_category.name =$1 AND m_category.m_category_index = A.m_category_index ORDER BY A.store_info_index LIMIT 10 OFFSET $2;',[m_category,count]);
            // 찜한 개수 넣기, 후문 정문 여부, 간략한 소개
            client.end();
            if(query.rowCount != 0){
                result.success= true;
                result.list = query.rows;
            }
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
            const query = await client.query('SELECT * FROM service.store_information WHERE store_name = $1;',[store_name]);
            client.end();
            const result = { 
                "success" : true,
                "store" : query.rows[0].store_name,
                "call_number" : query.rows[0].call_number,
                "opening_hours" : query.rows[0].opening_hours,
                "day_off " : query.rows[0].day_off,
                "prices" : query.rows[0].prices,
                "location" : query.rows[0].location,
                "latitude" : query.rows[0].latitude,
                "longitude" : query.rows[0].longitude
            }
            return res.send(result);
    
        }
        catch(err){
            console.log(err);
            const result = { "success" : false }
            return res.send(result);
        }
}

exports.getStoreLocation = async(req,res) =>{
    const client = new Client(config);
    const category = req.params.m;
    const result ={
        "success" : false,
        "list" : null
    }   
        try{
            await client.connect();
            const query = await client.query('SELECT store_name, latitude, longitude FROM service.store_information INNER JOIN service.m_category ON m_category.name = $1 AND m_category.m_category_index = store_information.m_category_index;',[category]);
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


exports.getLargeCategory = async(req,res) =>{
    // 대분류 가져오기
    const result = {
        "success" : false,
        "list" : null
    };
    const client = new Client(config);
        try{
            await client.connect();
            const query = await client.query("SELECT name, icon_url FROM service.l_category;");
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
    const all ={
        "먹거리" : [],
        "카페" : [],
        "놀거리" : [] ,
        "서비스" : [] ,
        "상점" : []
    }
    const largeCategory = req.params.l;
    const client = new Client(config);
        try{
              await client.connect();

                  if(largeCategory == "all"){
                    const query = await client.query("SELECT B.name AS l_name, A.name AS m_name FROM service.m_category A LEFT JOIN service.l_category B ON A.l_category_index = B.l_category_index;");
                    client.end();
                    for(let i=0; i<query.rowCount; i++){
                        switch(query.rows[i].l_name){
                            case "먹거리" :
                                all.먹거리.push(query.rows[i].m_name);
                                break;
                            case "카페" :
                                all.카페.push(query.rows[i].m_name);
                                break;
                            case "놀거리" :
                                all.놀거리.push(query.rows[i].m_name);
                                break;
                            case "서비스" :
                                all.서비스.push(query.rows[i].m_name);
                                break;
                            case "상점" :
                                all.상점.push(query.rows[i].m_name);
                                break;
                            
                            default :
                                continue;
                        }
                    }
                    return res.status(200).send(all);

                }

                const query = await client.query("SELECT m_category.name, m_category.icon_url FROM service.m_category INNER JOIN service.l_category ON l_category.name = $1 AND m_category.l_category_index = l_category.l_category_index;",[largeCategory]);
                client.end();
                result.success = true;
                result.list = query.rows;
                return res.status(200).send(result);
            }
        catch(err){
            console.log(err);
            return res.send(result);x
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
            const query = await client.query("SELECT menu_name, brief_info, price, store_menu.image_url FROM service.store_menu INNER JOIN service.store_information ON store_information.store_name = $1 AND store_information.store_info_index = store_menu.store_info_index;",[store_name]);
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
        "list" : null,
        "isWrited" : false,
        "myReview" : null
    }
    const store = req.params.name;
    const id = req.id;
    let order;
    const client = new Client(config);
    if(req.body.order_type == "최신순"){
        order = 'writed_at';
    }
    else{
        order = 'star_rating';
    }
    try{
        await client.connect();
            const isWrited = await client.query("SELECT c.nickname,a.star_rating, a.review, a.writed_at FROM service.store_review a INNER JOIN service.store_information b ON a.store_info_index = b.store_info_index AND b.store_name = $1 INNER JOIN service.user_information c ON c.user_index = a.user_index AND c.id = $2",[store,id])
            if(isWrited.rowCount != 0){
                result.isWrited = true;
                result.myReview = isWrited.rows[0];
                console.log(result.myReview);
            }
            const review = await client.query("SELECT c.nickname, a.star_rating, a.review, a.writed_at FROM service.store_review a INNER JOIN service.store_information b ON b.store_name = $1 AND b.store_info_index = a.store_info_index INNER JOIN service.user_information c ON a.user_index = c.user_index ORDER BY " + order +" DESC;",[store]);
            client.end();
            result.success = true;
            result.list = review.rows;
            return res.send(result);
    }
    catch(err){
        console.log(err);
        return res.send(result);
    }
}

exports.createReview = async(req,res) =>{
    const store = req.params.name;
    const id = req.id;
    const review = req.body.review;
    const star_rating = req.body.star_rating;
    const client = new Client(config);

        try{
            await client.connect();
            const date = new Date();
            date.setHours(date.getHours()+9);
            await client.query("INSERT INTO service.store_review (store_info_index, user_index, star_rating, review, writed_at) VALUES((SELECT store_info_index FROM service.store_information WHERE store_name = $1), (SELECT user_index FROM service.user_information WHERE id = $2), $3, $4, $5);",[store, id, star_rating, review, date]);
            client.end();
            return res.send({
                "success" : true
            })
        }
        catch(err){
            console.log(err);
            return res.send({
                "success" : false,
                "message" : "이미 리뷰를 작성하였습니다."
            });
        }
}

exports.deleteReview = async(req,res)=>{
    const store = req.params.name;
    const id = req.id;
    const client = new Client(config);

    try{
        await client.connect();
        await client.query("DELETE FROM service.store_review a USING service.store_information b, service.user_information c WHERE a.store_info_index = b.store_info_index AND b.store_name = $1 AND c.user_index = a.user_index AND c.id =$2;",[store,id]);
        client.end();
        return res.send({
            "success" : true
        })
    }
    catch(err){
        console.log(err);
        return res.send({
            "success" : false
        })
    }
}

exports.putReview = async(req,res)=>{

}