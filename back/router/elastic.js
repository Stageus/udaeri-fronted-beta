const router = require("express").Router();
const elastic = require("elasticsearch");

// /elastic/status
router.get("/status", (req, res) => {
    const result = {
        "connect": false
    }

    const client = new elastic.Client({
        node: "http://127.0.0.1:9200" // 주소(클라우드면 클라우드 IP, 추가로 id, password 입력해야함)
    })

    client.ping(
        {
            requestTimeout: 1000, // ms
        }, (err) => {
            if (err) {
                console.log("elastic connection error")
            }
            else {
                result.connect = true
            }
            res.send(result)
        })
})

router.post("", (req, res) => {
    const result = {
        "success": false
    }
    const receiveName = req.body.name
    console.log("value", receiveName);

    const client = new elastic.Client({
        node: "http://127.0.0.1:9200" // 주소(클라우드면 클라우드 IP, 추가로 id, password 입력해야함)
    })

    client.index( // then 써도 되고, 이렇게 해도 됨
        { // 삽입 명령어, 싱글노드 싱글클러스터니까 일단 클러스터랑 노드는 비움, 쓸 수도 있다.
            index: "member", // 이 이름으로 
            body: { // 이 밑의 내용을 넣음, json 넣을 수도 있다.
                "name": receiveName,
            },
        }
    )
    .then(() => {
        result.success = true
        res.send(result)
    })
})

router.post("/search", (req, res) => {
    const result = {
        "data": null
    }
    const receiveName = req.body.name
    console.log("value", receiveName);

    const client = new elastic.Client({
        node: "http://127.0.0.1:9200" // 주소(클라우드면 클라우드 IP, 추가로 id, password 입력해야함)
    })

    client.search({
            index: "member",
            body: { // 알고리즘 검색 필요, 여러가지 존재
                query: {
                    match: { // 해당 글씨와 동일한것 찾음
                        name: receiveName
                    }
                }
            }
        }, (data, err) => {
            if (err) {
                console.log("elastic search error")
            }
            else {
                const names = []
                data.hits.hits.array.forEach(item => {
                    names.push(item._source)
                });
                result.data = names
            }
            res.send(result)
        }
    )
})

module.exports = router