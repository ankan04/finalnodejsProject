const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({    
    title:{
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    _createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    body: mongoose.Schema.Types.String,
})

module.exports= mongoose.model("post", postSchema)

    
    