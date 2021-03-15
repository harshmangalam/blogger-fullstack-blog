
module.exports = (req, res, next) => {
    try {
        const user = res.locals.user
        if (user.role != "ADMIN") {
            throw new Error("You have not authorized to access this resource")
        }

        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({ error })
    }
}