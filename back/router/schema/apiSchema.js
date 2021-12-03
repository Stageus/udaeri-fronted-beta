const mongoose = require('mongoose');

const apiSchema = mongoose.Schema({
    api: "string",
    time: "date",
    parameter : "object"
})

module.exports = mongoose.model('api', apiSchema) // ('실제 사용할 때 쓸 이름')