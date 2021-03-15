const {model,Schema} = require("mongoose")

const schema = new Schema({
    title:{
        type:String,
        trim:true,
    },
    body:{
        type:String,
        trim:true,
        required:false,
       
    },
    image:{
        type:String,
        required:false,
        trim:true,
    },

    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
    
    
},{timestamps:true})

module.exports = model("Post",schema)
