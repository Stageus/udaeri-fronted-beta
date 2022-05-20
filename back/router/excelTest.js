const xlsx = require("xlsx");
const {Client} = require('pg');
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


exports.test = async(req,res) =>{

    const workbook = await xlsx.readFile(path.join(__dirname, './guide.xlsx'));

    // 시트 이름
    const mukguri = workbook.SheetNames[1];
    const cafe = workbook.SheetNames[2];
    const alcohol = workbook.SheetNames[3];
    const nolguri = workbook.SheetNames[4];
    const service = workbook.SheetNames[5];
    const store = workbook.SheetNames[6];
    const menu = workbook.SheetNames[7];


    // 시트 이름에 따른 정보
    const mukguriSheet = await workbook.Sheets[mukguri];
    const cafeSheet = await workbook.Sheets[cafe];
    const alcoholSheet = await workbook.Sheets[alcohol];
    const nolguriSheet = await workbook.Sheets[nolguri];
    const serviceSheet = await workbook.Sheets[service];
    const storeSheet = await workbook.Sheets[store];
    const menuSheet = await workbook.Sheets[menu];


    // 시트의 각 record가 json 배열 형태로 저장된다.
    const mukguriRecord = await xlsx.utils.sheet_to_json(mukguriSheet);
    const cafeRecord = await xlsx.utils.sheet_to_json(cafeSheet);
    const alcoholRecord = await xlsx.utils.sheet_to_json(alcoholSheet);
    const nolguriRecord = await xlsx.utils.sheet_to_json(nolguriSheet);
    const serviceRecord = await xlsx.utils.sheet_to_json(serviceSheet);
    const storeRecord = await xlsx.utils.sheet_to_json(storeSheet);
    const menuRecord = await xlsx.utils.sheet_to_json(menuSheet);

    await insertRecord(mukguriRecord);
    await insertRecord(cafeRecord);
    //await insertRecord(alcoholRecord);  //중분류가 없음
    //await insertRecord(nolguriRecord);    // 대표메뉴가 없음
    //await insertRecord(serviceRecord);    // 대표메뉴가 없음
    //await insertRecord(storeRecord);        // 대표메뉴가 없음
    await insertMenu(menuRecord);   


    res.send({
        a : 1
    });

}

const insertRecord = async(record) =>{
    const client = new Client(config);
    await client.connect();

    for(i=0; i<record.length; i++){
        const created_at = new Date();
        created_at.setHours(created_at.getHours()+9);    
        await client.query(`INSERT INTO service.store_information (m_category_index, store_name, main_menu, call_number, opening_hours, avg_price, location, image_url, created_at, latitude, longitude, favorited_count, inha_location)
                             VALUES ((SELECT m_category_index FROM service.m_category WHERE name = $1),$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13);`
                             ,[record[i].중분류, record[i].가게이름, record[i].대표메뉴, record[i].전화번호, record[i].영업시간, record[i].평균가격, record[i].주소명, '', created_at, record[i].위도, record[i].경도, 0, '후문']);
    }

    await client.end();
}

const insertMenu = async(record) =>{
    const client = new Client(config);
    await client.connect();

    for(i=0; i<record.length; i++){
        const created_at = new Date();
        created_at.setHours(created_at.getHours()+9);    
        await client.query(`INSERT INTO service.menu_category (store_info_index, menu_category_name) VALUES ((SELECT store_info_index FROM service.store_information WHERE store_name = $2), $1)
                            ON CONFLICT (store_info_index, menu_category_name)
                            DO NOTHING;` ,[record[i].메뉴분류, record[i].가게이름]);
                            
        await client.query(`INSERT INTO service.store_menu (menu_category_index, menu_name, price, image_url)
                            VALUES ((SELECT menu_category_index FROM service.menu_category AS category 
                                    INNER JOIN service.store_information AS info ON category.store_info_index = info.store_info_index WHERE info.store_name = $2 AND category.menu_category_name = $1 ),
                            $3, $4, $5)`, [record[i].메뉴분류, record[i].가게이름, record[i].메뉴, record[i].가격, '']);
    }
    await client.end();
}