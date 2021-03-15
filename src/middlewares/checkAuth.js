const { JWT_SECRET } = require("../config");
const User = require("../models/user.model")
const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
    try {
       
        const header = req.headers.authorization
        let user;

        if (header) {
            const token = header.split("Bearer ")[1]
            if (token) {
                const {userId} = jwt.decode(token,JWT_SECRET)
                if (!userId) {
                    return res.status(403).json({ error: "User not found register if you are new to site" })
                }
                user = await User.findById(userId)

                if (!user) {
                    return res.status(403).json({ error: "User not found register if you are new to site" })
                }
            } else {
                return res.status(403).json({ error: "Authentication token is not available" })
            }
        }


        res.locals.user = user
        next()


    } catch (error) {
        console.log(error)
        return res.status(500).json({ error:"Something went wrong" })
    }
}