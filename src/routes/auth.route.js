const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
const {JWT_SECRET} = require("../config")
const router = require("express").Router()

router.post("/login",async (req,res) => {
    try {
        const {email,password} = req.body

        const user = await User.findOne({
            email
        })

        if(!user){
            return res.status(400).json({email:"Invalid credentials"})
        }
        const matchPassword = await  bcrypt.compare(password,user.password)
        if(!matchPassword){
            return res.status(400).json({error:"Invalid credentials"})
        }

        const token = jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:"12h"})

        return res.status(201).json({
            message:"You have loggedin successfully",
            data:{
                userId:user._id,
                token
            }
        })
        
    } catch (error) {
        console.log(error)
        return res.status(200).json({error:"Something went wrong"})
    }
})



router.post("/register",async (req,res) => {
    try {
        let {email,password,name} = req.body

        const user = await User.findOne({
            email
        })

        if(user){
            return res.status(400).json({email:"Email already exists"})
        }
        
       password = await bcrypt.hash(password,6)

        const createUser = new User({
            name,
            email,
            password
        })

        const saveUser = await createUser.save()


        return res.status(201).json({
            message:"Your Account created successfully",
            data:{
                userId:saveUser._id
            }
        })
        
    } catch (error) {
        console.log(error)
        return res.status(200).json({error:"Something went wrong"})
    }
})


module.exports = router