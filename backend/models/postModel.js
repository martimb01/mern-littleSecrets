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
    },
    secretId: {
        type: mongoose.Schema.Types.ObjectId,
        validate: {
            validator: function (value) {
                return (!this.isSecret || this.isSecret && value)
                }, message: 'secretId is required if isSecret is true'
        }
    }
}, 
{timestamps: true})

const Post = new mongoose.model('Post', postSchema)

module.exports = Post