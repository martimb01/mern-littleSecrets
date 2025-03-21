const Post = require('../models/postModel')

const createPost = async (req, res) => {
    try{
        const post = req.body
        if (!post.title || !post.content) {
            console.log('Not all field completed')
           return res.status(400).json({message: 'Post needs to have both a title and content!'})
        }
        
        const newPost = new Post({
            title: post.title,
            content: post.content,
            userId: req.user.id,
            imgUrl: post.imgUrl
        })
        await newPost.save()
        res.status(201).json({message:'Post created!'})

    } catch (err) {
        console.log (err.message)
        res.status(500).json({message:'Something went very wrong creating the post'})

    }
}

const getPosts = async (req,res) => {
    try{
        const posts = await Post.find({userId: req.user.id})

        if(posts.length === 0) {
            console.log("No posts by that userId")
            return res.status(400).json({message: 'That user has no posts!'})
        }

        console.log("Posts with that userId found and sent!")
        res.status(200).json({message: 'posts found!', posts})

    } catch (err) {
        console.log(err.message)
        res.status(500).json({message: "Something went wrong fetching posts!"})
    }
}

const deletePost = async (req,res) => {
    try {
        console.log(req.body)
        const deletedPost = await Post.findByIdAndDelete(req.body.id)
        if (!deletedPost) {
            console.log("Post does not exist!")
            return res.status(404).json({message: 'Post does not exist'})
        }
        console.log("Post has been deleted!")
        return res.status(200).json({message: 'Post has been deleted'})

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({message: "Something went wrong deleting post!"})
    }
}

module.exports = {createPost, getPosts, deletePost}