const {Client} = require('pg');
const dotenv = require('dotenv');
const path = require('path');
const elastic = require('./elastic');

dotenv.config({path : path.join(__dirname, "../../.env")});

const config = {
    user: process.env.DB_USER,
    host : process.env.DB_HOST,
    database : process.env.DB_NAME,
    password : process.env.DB_PASSWORD,
    port : process.env.DB_PG_PORT,
};

exports.getRandom = async(req,res) =>{
    let category = req.body.categoryList;
    if(category == undefined || category == []){
        await elastic.apiLogging(req,400);
        return res.status(400).send({
            success : false,
            message : "요청 데이터가 너무 적습니다."
        })
    }

    let q = 'SELECT store_name, main_menu, m_category.name AS name FROM service.store_information INNER JOIN service.m_category ON m_category.m_category_index = store_information.m_category_index AND m_category.name IN (';
    category.map((item, index) => {
        q = q + '\'' + item + '\'';

        index != category.length-1 ? 
        q+=',' : null;
    })
    q+=');'

    try{
        const client = new Client(config);
        await client.connect();
        const query = await client.query(q);
        client.end();
        const rand = Math.floor(Math.random() * query.rowCount);
        await elastic.apiLogging(req,200);
        return res.status(200).send({
            "success" : true,
            "store" :{
                "category" : query.rows[rand].name,
                "store" : query.rows[rand].store_name,
                "main_menu" : query.rows[rand].main_menu
            }
        });
    }
    catch(err){
        await elastic.errLogging(req,500,err);
        return res.status(500).send({
            success : false
        });
        }
}

exports.getStoreAll = async(req,res) =>{      // 중분류 가게들 10개씩 가져오는 api
    const all = { }
    const l_category = req.params.l;
    const m_category = req.params.m;

    if(l_category == undefined || m_category == undefined){
        await elastic.apiLogging(req,400);
        return res.status(400).send({
            success : false,
            message : "요청 데이터가 너무 적습니다."
        })
    }

    try{
        const client = new Client(config);
        await client.connect();

        if(m_category == 'all'){  // 중분류 가게들 10개씩 가져오는 query 
            const query = await client.query('WITH CT AS( SELECT *, RANK() OVER (PARTITION BY s.m_category_index ORDER BY s.store_info_index ASC) AS RN FROM service.store_information AS s) SELECT B.name AS m_name, A.store_name, A.image_url, A.main_menu, A.inha_location, A.favorited_count FROM CT A LEFT JOIN service.m_category B ON A.m_category_index = B.m_category_index LEFT JOIN service.l_category C ON B.l_category_index = C.l_category_index WHERE C.name = $1 AND A.RN <=10;',[l_category]); // request로 받은 대분류 하위 중분류들을 가져오는 query
            const cateogoryQuery = await client.query('SELECT A.name FROM service.m_category A INNER JOIN service.l_category B ON A.l_category_index = B.l_category_index WHERE B.name = $1;', [l_category]);

            client.end();
            
            for(i=0; i<cateogoryQuery.rowCount; i++){  // 중분류별로 배열 생성
                all[cateogoryQuery.rows[i].name] = [];
            }

            for(i=0; i<query.rowCount; i++){           // 가게들을 중분류에 맞게 배열에 넣음
                all[query.rows[i].m_name].push(query.rows[i]);
            }
            await elastic.apiLogging(req,200);
            return res.status(200).send(all);
        }
        else{
            client.end();
            await elastic.apiLogging(req,400);
            return res.status(400).send({
                success : false
            });
        }
    }
    catch(err){
        await elastic.errLogging(req,500,err);
        return res.status(500).send({
            success : false
        });
    }
}


exports.getStoreList = async(req,res) =>{      // 가게목록 가져오기
    const result = { 
        "success" : false,
        "list" : null
    }    
    const m_category = req.params.m;
    const count = req.params.count * 10;

    if(m_category == undefined || count == undefined){
        await elastic.apiLogging(req,400);
        return res.status(400).send({
            success : false,
            message : "요청 데이터가 너무 적습니다."
        })
    }

    try{
        const client = new Client(config);
        await client.connect();
        const query = await client.query('SELECT A.store_name, A.image_url, A.main_menu, A.inha_location, A.favorited_count FROM service.store_information A INNER JOIN service.m_category ON m_category.name =$1 AND m_category.m_category_index = A.m_category_index ORDER BY A.store_info_index LIMIT 10 OFFSET $2;',[m_category,count]);
        // 찜한 개수 넣기, 후문 정문 여부, 간략한 소개
        client.end();

        if(query.rowCount != 0){
            result.success= true;
            result.list = query.rows;
        }
        await elastic.apiLogging(req,200);
        return res.status(200).send(result);
    }
    catch(err){
        await elastic.errLogging(req,500,err);
        return res.status(500).send(result);
    }
}

exports.getStoreInformation = async(req,res) =>{      // 가게 정보(위치, 전화번호 등) 가져오기
    const store_name = req.params.name;

    if(store_name == undefined){
        await elastic.apiLogging(req,400);
        return res.status(400).send({
            success : false,
            message : "요청 데이터가 너무 적습니다."
        })
    }

    try{
        const client = new Client(config);
        await client.connect();
        const query = await client.query('SELECT * FROM service.store_information WHERE store_name = $1;',[store_name]);
        client.end();
        await elastic.apiLogging(req,200);
        return res.status(200).send({
            "success" : true,
            "store" : query.rows[0].store_name,
            "call_number" : query.rows[0].call_number,
            "opening_hours" : query.rows[0].opening_hours,
            "day_off " : query.rows[0].day_off,
            "prices" : query.rows[0].prices,
            "location" : query.rows[0].location,
            "latitude" : query.rows[0].latitude,
            "longitude" : query.rows[0].longitude
        });
    }
    catch(err){
        await elastic.errLogging(req,500,err);
        return res.status(500).send({
            success : false
        });
    }
}

exports.getStoreLocation = async(req,res) =>{
    const category = req.params.m;

    if(category == undefined){
        await elastic.apiLogging(req,400);
        return res.status(400).send({
            success : false,
            message : "요청 데이터가 너무 적습니다."
        })
    }

    try{
        const client = new Client(config);
        await client.connect();
        const query = await client.query('SELECT store_name, latitude, longitude FROM service.store_information INNER JOIN service.m_category ON m_category.name = $1 AND m_category.m_category_index = store_information.m_category_index;',[category]);
        client.end();
        await elastic.apiLogging(req,200);
        return res.status(200).send({
            success : true,
            list : query.rows
        });
    }
    catch(err){
        await elastic.errLogging(req,500,err);
        return res.send({
            success : false
        });
    }
}


exports.getLargeCategory = async(req,res) =>{
        try{
            const client = new Client(config);
            await client.connect();
            const query = await client.query("SELECT name, icon_url FROM service.l_category;");
            client.end();
            await elastic.apiLogging(req,200);
            return res.status(200).send({
                success : true,
                list : query.rows
            });
        }
        catch(err){
		console.log(err);
            await elastic.errLogging(req,500,err);
            return res.status(500).send({
                success : false
            });
        }
}

exports.getMiddleCategory = async(req,res) =>{
    const largeCategory = req.params.l;

    if(largeCategory == undefined){
        await elastic.apiLogging(req,400);
        return res.status(400).send({
            success : false,
            message : "요청 데이터가 너무 적습니다."
        })
    }

    const client = new Client(config);
        try{
            await client.connect();

            if(largeCategory == "all"){
            const all ={
                "먹거리" : [],
                "카페" : [],
                "놀거리" : [] ,
                "서비스" : [] ,
                "상점" : []
            }                
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
            await elastic.apiLogging(req,200);
            return res.status(200).send(all);
            }

            const query = await client.query("SELECT m_category.name, m_category.icon_url FROM service.m_category INNER JOIN service.l_category ON l_category.name = $1 AND m_category.l_category_index = l_category.l_category_index;",[largeCategory]);
            client.end();
            await elastic.apiLogging(req,200);
            return res.status(200).send({
                success : true,
                list : query.rows
            });
        }
        catch(err){
            await elastic.errLogging(req,500,err);
            return res.status(500).send({
                success : false
            })
        }
}

exports.getStoreMenu = async(req,res) =>{     //메뉴목록 가져오기
    const store_name = req.params.name;
    if(store_name == undefined){
        await elastic.apiLogging(req,400);
        return res.status(400).send({
            success : false,
            message : "요청 데이터가 너무 적습니다."
        })
    }

        try{
            const client = new Client(config);
            await client.connect();
            const query = await client.query("SELECT menu_name, brief_info, price, store_menu.image_url FROM service.store_menu INNER JOIN service.store_information ON store_information.store_name = $1 AND store_information.store_info_index = store_menu.store_info_index;",[store_name]);
            client.end();

            await elastic.apiLogging(req,200);
            return res.status(200).send({
                success : true,
                list : query.rows
            });
        }
        catch(err){
            await elastic.errLogging(req,500,err);
            return res.status(500).send({
                success : false
            });
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
    if(req.body.order_type == "최신순"){
        order = 'writed_at';
    }
    else{
        order = 'star_rating';
    }

    if(store == undefined || id == undefined || order == undefined){
        await elastic.apiLogging(req,400);
        return res.status(400).send({
            success : false,
            message : "요청 데이터가 너무 적습니다."
        })
    }
    try{
        const client = new Client(config);
        await client.connect();

        // 유저가 해당 가게에 리뷰를 작성한 적이 있는지 체크
        const isWrited = await client.query("SELECT c.nickname,a.star_rating, a.review, a.writed_at FROM service.store_review a INNER JOIN service.store_information b ON a.store_info_index = b.store_info_index AND b.store_name = $1 INNER JOIN service.user_information c ON c.user_index = a.user_index AND c.id = $2",[store,id])
        if(isWrited.rowCount != 0){
            result.isWrited = true;
            result.myReview = isWrited.rows[0];
        }

        // 가게 review들을 가져옴
        const review = await client.query("SELECT c.nickname, a.star_rating, a.review, a.writed_at FROM service.store_review a INNER JOIN service.store_information b ON b.store_name = $1 AND b.store_info_index = a.store_info_index INNER JOIN service.user_information c ON a.user_index = c.user_index ORDER BY " + order +" DESC;",[store]);
        client.end();
        result.success = true;
        result.list = review.rows;
        await elastic.apiLogging(req,200);
        return res.status(200).send(result);
    }
    catch(err){
        await elastic.errLogging(req,500,err);
        return res.status(500).send(result);
    }
}

exports.createReview = async(req,res) =>{
    const store = req.params.name;
    const id = req.id;
    const review = req.body.review;
    const star_rating = req.body.star_rating;

    if(store == undefined || id ==undefined || review == undefined || star_rating == undefined){
        await elastic.apiLogging(req,400);
        return res.status(400).send({
            success : false,
            message : "요청 데이터가 너무 적습니다."
        })
    }

        try{
            const client = new Client(config);
            await client.connect();
            const date = new Date();
            date.setHours(date.getHours()+9);
            await client.query("INSERT INTO service.store_review (store_info_index, user_index, star_rating, review, writed_at) VALUES((SELECT store_info_index FROM service.store_information WHERE store_name = $1), (SELECT user_index FROM service.user_information WHERE id = $2), $3, $4, $5);",[store, id, star_rating, review, date]);
            client.end();
            
            await elastic.apiLogging(req,200);
            return res.status(200).send({
                "success" : true
            })
        }
        catch(err){
            await elastic.errLogging(req,500,err);
            return res.status(500).send({
                "success" : false,
                "message" : "이미 리뷰를 작성하였습니다."
            });
        }
}

exports.deleteReview = async(req,res)=>{
    const store = req.params.name;
    const id = req.id;

    if(store == undefined || id == undefined){
        await elastic.apiLogging(req,400);
        return res.status(400).send({
            success : false,
            message : "요청 데이터가 너무 적습니다."
        })
    }

    try{
        const client = new Client(config);
        await client.connect();
        await client.query("DELETE FROM service.store_review a USING service.store_information b, service.user_information c WHERE a.store_info_index = b.store_info_index AND b.store_name = $1 AND c.user_index = a.user_index AND c.id =$2;",[store,id]);
        client.end();
        await elastic.apiLogging(req,200);
        return res.status(200).send({
            "success" : true
        })
    }
    catch(err){
        await elastic.errLogging(req,500,err);
        return res.status(500).send({
            "success" : false
        })
    }
}

exports.putReview = async(req,res)=>{
    const store = req.params.name;
    const id = req.id;
    const review = req.body.review;
    const star_rating = req.body.star_rating;
    const date = new Date();
    date.setHours(date.getHours()+9);

    if(store == undefined || id == undefined || review == undefined || star_rating == undefined){
        await elastic.apiLogging(req,400);
        return res.status(400).send({
            success : false,
            message : "요청 데이터가 너무 적습니다."
        })
    }
    
    try{
        const client = new Client(config);
        await client.connect();
        await client.query("UPDATE service.store_review a SET star_rating = $1, review =$2 ,writed_at = $3 FROM service.store_information b, service.user_information c WHERE b.store_name = $4 AND a.store_info_index = b.store_info_index AND c.id = $5 AND a.user_index = c.user_index;",[star_rating,review,date,store,id]);
        client.end();
        await elastic.apiLogging(req,200);
        return res.status(200).send({
            "success" : true
        })
    }
    catch(err){
        await elastic.errLogging(req,500,err);
        return res.status(500).send({
            "success" : false
        })
    }
}
