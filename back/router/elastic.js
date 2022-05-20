const elastic = require("elasticsearch");
const fetch = require("node-fetch");


exports.getElasticsearchStatus = async(req,res)=>{

    const auth = `${process.env.ELASTIC_USER}:${process.env.ELASTIC_PASSWORD}`;
    const elasticClient = new elastic.Client({
	    host : `http://${auth}@localhost:9200`
    })

    await elasticClient.ping(
        {
            requestTimeout: 1000, // ms
        }, 
        (err) => {
            if (err) {
                console.log("elastic connection error")
		console.log(err);
                return res.send({success : false})
            }
            else{
                console.log("elastic is connected!")
                return res.send({success : true})
            }
        })
}

exports.pushElasticsearchStore = async(req,res)=>{   

    const store_name = req.body.store_name;
    //const image_url = req.body.image_url;
    const main_menu = req.body.main_menu;
    const inha_location = req.body.inha_location;
    const favorited_count = 0;
    const menu = req.body.menu;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    const auth = `${process.env.ELASTIC_USER}:${process.env.ELASTIC_PASSWORD}`;
    const elasticClient = new elastic.Client({
	    host : `http://${auth}@localhost:9200`
    })


    await elasticClient.index( 
        { 
            "index": "stores",
            "body": { 
                "store_name": store_name,
                "main_menu" : main_menu,
                "inha_location" : inha_location,
                "favorited_count" : favorited_count,
                "menu" : menu,
                //"image_url" : image_url,
                "latitude" : Number(latitude),
                "longitude" : Number(longitude)
            },
        }
    )
}

exports.setNoriTokenizer = async(req,res)=>{
    const auth = `${process.env.ELASTIC_USER}:${process.env.ELASTIC_PASSWORD}`;
    const elasticClient = new elastic.Client({
	    host : `http://${auth}@localhost:9200`
    })

    const setting = {
        "analysis": {
          "analyzer": {
            "nori_discard": {
              "tokenizer": "nori_t_discard",
              "filter": "my_shingle"
            }
          },
          "tokenizer": {
            "nori_t_discard": {
              "type": "nori_tokenizer",
              "decompound_mode": "discard"
            }
          },
          "filter" :{
              "my_shingle" :{
                  "type" : "shingle",
                  "token_separator" : "",
                  "max_shingle_size" : 3
              }
          }
        }
      }
      
    const mapping = {
        "properties": {
            "store_name": {
              "type": "text",
              "fields": {
                "nori_discard": {
                  "type": "text",
                  "analyzer": "nori_discard",
                  "search_analyzer": "standard"
                }
              }
            },
            "menu": {
              "type": "text",
              "fields": {
                "nori_discard": {
                  "type": "text",
                  "analyzer": "nori_discard",
                  "search_analyzer": "standard"
                }
              }
            }
          }
    }

    const result = await elasticClient.indices.create({
        index : 'stores',
        body :{
            settings : setting,
            mappings : mapping
        }
    });

 
    return res.send(result);

}

exports.deleteelastic = async (req,res)=>{
    const auth = `${process.env.ELASTIC_USER}:${process.env.ELASTIC_PASSWORD}`;
    const elasticClient = new elastic.Client({
	    host : `http://${auth}@localhost:9200`
    })

    const result = await elasticClient.indices.delete({
        index : 'stores'
    })
    console.log(result);
}

exports.getElasticsearchStoreList = async(req,res)=>{
    const searchText = req.body.text;
    const startOffset = req.params.count;

    if(searchText == undefined || startOffset == undefined)
        return res.send({
            "message" : "잘못된 요청입니다"
        })
    const auth = `${process.env.ELASTIC_USER}:${process.env.ELASTIC_PASSWORD}`;
    const elasticClient = new elastic.Client({
	    host : `http://${auth}@localhost:9200`
    })


    const result = await elasticClient.search({
        index : 'stores',
        q : searchText,
        _source : ["store_name", "main_menu", "inha_location", "favorited_count", /*"image_url",*/ "latitude", "longitude"],
        from : (startOffset-1) * 15,
        size : 15
    })

    let storeList = new Array();
    for(i=0; i<result.hits.total.value; i++){
        storeList.push(result.hits.hits[i]._source);
    }
    return res.send(storeList);
}

exports.updateElasticsearch = async(req,res)=>{    //test
    const auth = `${process.env.ELASTIC_USER}:${process.env.ELASTIC_PASSWORD}`;
    const elasticClient = new elastic.Client({
	    host : `http://${auth}@localhost:9200`
    })

    const result = await elasticClient.updateByQuery({
        index : 'stores',
        refresh : true,
        body :{
            script : {
                lang : 'painless',
                source : `ctx._source.latitude = ${37.452278}` + ';' + `ctx._source.longitude = ${126.660746}`,
            },
            query :{
                bool :{
                must : [ {
                    match : {
                        'store_name' : '성화해장국'
                    }
                }
            ]
            }
        }
        }
    })

    return res.send(result);
}

exports.increaseFavoriteCount = async(storeName)=>{
    const auth = `${process.env.ELASTIC_USER}:${process.env.ELASTIC_PASSWORD}`;
    const elasticClient = new elastic.Client({
	    host : `http://${auth}@localhost:9200`
    })


    const result = await elasticClient.updateByQuery({
        index : 'stores',
        refresh : true,
        body : {
            script : {
                lang : 'painless',
                source : 'ctx._source.favorited_count++'
            },
            query :{
                bool :{
                    must :[{
                        match : {
                            'store_name' : storeName
                        }
                    }]
                }
            }
        }
    })

}

exports.decreaseFavoriteCount = async(storeName)=>{
    const auth = `${process.env.ELASTIC_USER}:${process.env.ELASTIC_PASSWORD}`;
    const elasticClient = new elastic.Client({
	    host : `http://${auth}@localhost:9200`
    })

    const result = await elasticClient.updateByQuery({
        index : 'stores',
        refresh : true,
        body : {
            script : {
                lang : 'painless',
                source : 'ctx._source.favorited_count--'
            },
            query :{
                bool :{
                    must :[{
                        match : {
                            'store_name' : storeName
                        }
                    }]
                }
            }
        }
    })
}


exports.apiLogging = async(req, status)=>{
    const auth = `${process.env.ELASTIC_USER}:${process.env.ELASTIC_PASSWORD}`;
    const elasticClient = new elastic.Client({
	    host : `http://${auth}@localhost:9200`
    })	

    const date = new Date();
    const result = await elasticClient.index({
        "index" : "api_log",
        "body" : {
            "method" : req.method,
            "url" : req.url,
            "body" : JSON.stringify(req.body),
            "headers" : req.headers,
            "remoteAddress" : req._remoteAddress,
            "status" : status,
            "time" : date
        }
    })
}

exports.errLogging = async(req, status, err)=>{
    const auth = `${process.env.ELASTIC_USER}:${process.env.ELASTIC_PASSWORD}`;
    const elasticClient = new elastic.Client({
	    host : `http://${auth}@localhost:9200`
    })	

    const date = new Date();
    const result = await elasticClient.index({
        "index" : "err_log",
        "body" : {
            "method" : req.method,
            "url" : req.url,
            "body" : JSON.stringify(req.body),
            "headers" : req.headers,
            "remoteAddress" : req._remoteAddress,
            "status" : status,
            "error" : err,
            "time" : date
        }
    })
}






