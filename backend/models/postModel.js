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
    },
    isSecret: {
        type:Boolean,
        default: false,
        required: true
    }
}, 
{timestamps: true})

const Post = new mongoose.model('Post', postSchema)

module.exports = Post