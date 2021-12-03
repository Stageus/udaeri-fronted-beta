const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: "string",
    pw: "string"
})

module.exports = mongoose.model('user', userSchema) // ('실제 사용할 때 쓸 이름')