const mongoose = require('mongoose')

//Connect to DB
const connectToDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connected to DB!')
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = connectToDB;