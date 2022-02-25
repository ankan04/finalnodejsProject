const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({    
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },

    userName:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required: true
    },
    
    role:{
        type: String,
        enum : ['user','admin'],
        default: 'user'
    }
    
})
module.exports= mongoose.model("user", userSchema)

