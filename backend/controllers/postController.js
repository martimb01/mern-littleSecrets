const Post = require('../models/postModel')

const createPost = async (req, res) => {
    try{
        const post = req.body
        if (!post.title || !post.content) {
            console.log('Not all field completed')
           return res.status(400).json({message: 'Post needs to have both a title and content!'})
        }

        if(!post.isSecret) {
            const newPost = new Post({
                title: post.title,
                content: post.content,
                userId: req.user.id,
                imgUrl: post.imgUrl
            })
            await newPost.save()
            res.status(201).json({message:'Post created!'})
            return
        }
        
        if(!post.secretId) {
           return res.status(400).json({message:"Secret posts need to have a secretId to show where they belong"})
        }

        const newPost = new Post({
            title: post.title,
            content: post.content,
            userId: req.user.id,
            imgUrl: post.imgUrl,
            isSecret: post.isSecret,
            secretId: post.secretId
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
        const {type} = req.params
        const {secretId} = req.query
        let posts

        if (type == 'personal') {

            posts = await Post.find({userId: req.user.id, isSecret: false})

        } else if (type == 'shared') {

            if (!secretId) {
                return res.status(400).json({message: "SecretId is needed for secret posts!"})
            }
            posts = await Post.find({secretId: secretId, isSecret: true}).populate('userId', 'firstName lastName')

        } else {

            return res.status(400).json({message:"Invalid type!"})

        }
        
        if(posts.length === 0) {
            console.log("No posts by that userId")
            return res.status(200).json({message: 'That user has no posts!', posts: []}, )
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