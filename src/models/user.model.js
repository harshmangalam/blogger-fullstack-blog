const {model,Schema} = require("mongoose")

const schema = new Schema({
    name:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    
},{timestamps:true})

module.exports = model("User",schema)
