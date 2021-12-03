const mongoose = require('mongoose');

const sidSchema = mongoose.Schema({
    sid: "string",
    id: "string"
})

module.exports = mongoose.model('sid', sidSchema) // ('실제 사용할 때 쓸 이름')