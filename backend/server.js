// Importing dependencies
const express = require('express');
const connectDB = require('./db')
require('dotenv').config()
const userRouter = require ('./routes/usersRoute')
const postRouter = require('./routes/postRoute')
const cors = require('cors')

//Setting up express app
const app = express();
app.use(express.json())
app.use(cors())

app.use('/user', userRouter)
app.use('/post', postRouter)


const PORT = process.env.PORT || 3000;


//Starting server
app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT)
    connectDB()
})