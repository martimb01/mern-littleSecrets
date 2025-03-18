const Post = require('../models/postModel')

const createPost = async (req, res) => {
    try{
        const post = req.body
        if (!post.title || !post.content) {
            console.log('Not all field completed')
           return res.status(400).json({message: 'Post needs to have both a title and content!'})
        }
        
        const newPost = new Post(post)
        await newPost.save()
        res.status(201).json({message:'Post created!'})

    } catch (err) {
        console.log (err.message)
        res.status(500).json({message:'Something went very wrong creating the post'})

    }
}

module.exports = {createPost}