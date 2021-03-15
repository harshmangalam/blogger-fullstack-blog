const router = require('express').Router()
const User = require("../models/user.model")
const Post = require("../models/post.model")
const checkAuth = require("../middlewares/checkAuth")

router.get("/me",checkAuth,async (req,res)=>{
try{
    const currentUser = res.locals.user
    if(!currentUser){
        return res.status(404).json({error:"User does not exists"})
    }
    const user = await User.findById(currentUser._id)
    const posts = await Post.find({
        user:currentUser._id
    })

    return res.status(200).json({
        user,
        posts
    })

}catch(error){
    console.log(error)
    return res.status(500).json({error:"Something went wrong"})
}
})


router.get("/:userId",async (req,res)=>{
    try{
        const {userId} = req.params
       
        const user = await User.findById(userId)
    
        if(!user){
            return res.status(404).json({error:"User does not exists"})
        }
      const posts = await Post.find({
        user:userId
    })

    return res.status(200).json({
        user,
        posts
    })
    
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Something went wrong"})
    }
    })


    router.get("/",async (req,res)=>{
        try{
            const users = await User.find()
            return res.status(200).json(users)
        
        }catch(error){
            console.log(error)
            return res.status(500).json({error:"Something went wrong"})
        }
        })

module.exports = router