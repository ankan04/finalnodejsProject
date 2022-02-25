const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({    
    Title:{
        type: String,
        required: true,
        unique: true
    },
    desc:{
        type: String,
        required: true
    },
    body:String,

    _createdBy:String
    
})
module.exports= mongoose.model("post", postSchema)