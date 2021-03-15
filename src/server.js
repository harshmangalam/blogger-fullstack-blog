const express  = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const path = require("path")
const {PORT,MONGODB_URI,NODE_ENV,ORIGIN} = require("./config.js")

// const cors = require("cors")

const authRoutes = require("./routes/auth.route")
const userRoutes = require("./routes/user.route")
const postRoutes = require("./routes/post.route")

const app = express()

if(NODE_ENV === "development"){
    const morgan = require("morgan")
    app.use(morgan("dev"))
}

const corsConfig = {credentials:true,origin:ORIGIN,optionsSuccessStatus:200}

app.use(express.json())
// app.use(cors(corsConfig))

app.use(express.static(path.join(__dirname,"../client/build")))


app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/post",postRoutes)

app.get("*",(req,res)=>{
    res.render(path.join(__dirname,"../client/build/index.html"))
})
const main = async() => {
    try {
        await mongoose.connect(MONGODB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            useCreateIndex:true
        })
    
        console.log("database connected")
        app.listen(PORT,()=>{
            console.log(`server started on port ${PORT}`)
        })
        
        
    } catch (error) {
        console.log(error)
    }
}

main()

