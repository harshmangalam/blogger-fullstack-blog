const router = require('express').Router()
const Post = require("../models/post.model")
const checkAuth = require("../middlewares/checkAuth")
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find({}).populate("user")
	
	
        return res.status(200).json(posts)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Something went wrong" })
    }
})

router.get("/:postId", async (req, res) => {
    try {
        const { postId } = req.params
        const post = await Post.findById(postId).populate("user")

        if (!post) {
            return res.status(404).json({ error: "Post not found" })
        }
        return res.status(200).json(post)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Something went wrong" })
    }
})

router.post("/", checkAuth, async (req, res) => {
  const { title, body, image } = req.body

	let err = {}
	
	if(title  &&  title.trim().length === 0){
err.title = "Post title is required"
}

    try {
	
	if((body && body.trim().length === 0) && (image && image.trim().length === 0)){
		return res.status(400).json({ error: "Provide at least post body or post image" })
}

	if(Object.keys(err).length > 0){
	return res.status(400).json(err)
}
        const currentUser = res.locals.user

        if (!currentUser) {
            return res.status(404).json({ error: "User does not exists" })
        }
      
	
        const newPost = new Post({
            title,
            body, image, user: currentUser._id
        })

        const savePost = await newPost.save()



        return res.status(201).json({
            message: "Post created successfully",
            data: {
                postId: savePost._id
            }
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Something went wrong" })
    }
})

router.put("/:postId", checkAuth, async (req, res) => {
    try {
        const currentUser = res.locals.user
        if (!currentUser) {
            return res.status(404).json("User does not exists")
        }

        const { postId } = req.params
        const { title, body, image } = req.body
        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).json({ error: "Post not found" })
        }
       
        
    
        if (String(post.user) != String(currentUser._id)) {
            return res.status(403).json({ error: "You are not the author of Post" })
        }

        await Post.findByIdAndUpdate(postId, {
            title,
            body,
            image
        })
        return res.status(200).json({
            message: "Post updated successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Something went wrong" })
    }
})


router.delete("/:postId", checkAuth, async (req, res) => {
    try {
        const currentUser = res.locals.user
        if (!currentUser) {
            return res.status(404).json("User does not exists")
        }
        const { postId } = req.params


        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).json({ error: "Post not found" })
        }

        if (String(post.user) != String(currentUser._id)) {
            return res.status(404).json({ error: "You are not the author of Post" })
        }


        await Post.findByIdAndDelete(postId)

        return res.status(200).json({
            message: "Post deleted successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Something went wrong" })
    }
})




module.exports = router