const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    Name :{
        type: String,
        required : true
    },
    PhoneNumber : {
        type : String,
        required : true,
        unique : true
    },
    Age : {
        type : Number,
        required : true
    },
    Pincode : {
        type : Number,
        required : true
    },
    Aadhaar : { 
        type : String,
        required : true
    },
    password: {
        type : String,
        required : true, 
        // minLen: 8,
        // maxLen :15
    },
    vaccination : {
        type : String,
        default : "none"
    },
},{ timestamps : true })

module.exports = mongoose.model('user', userschema)