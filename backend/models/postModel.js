const mongoose  = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    imgUrl: {
        type:String,
    }
}, 
{timestamps: true})

const Post = new mongoose.model('Post', postSchema)

module.exports = Post