const mongoose = require ('mongoose');

const secretSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password:  {
        type: String,
        required: true
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    }
},
{timestamps: true})

const Secret = new mongoose.model('Secret', secretSchema)

module.exports = Secret;