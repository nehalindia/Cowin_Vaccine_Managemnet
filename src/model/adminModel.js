const mongo  = require("mongoose")


const schema = new mongo.Schema({
    Name : {
        type : String,
        required : true
    },
    PhoneNumber : {
        type : String,
        required : true
    },
    paasword : {
        type : String,
        required : true
    }
}, {timestamps : true})

module.exports = mongo.model('admin', schema)