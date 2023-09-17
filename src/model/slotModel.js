const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const slotSchema = new mongoose.Schema({
    userId : {
        type: ObjectId, 
        ref : 'user',
        required : true
    },
    date : {
        type : String,
        required : true
    },
    time : {
        type : String,
        required : true
    },
    dose : {
        type : String,
        required : true
    }
}, {timestamps : true})

module.exports = mongoose.model('slot',slotSchema)