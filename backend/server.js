// Importing dependencies
const express = require('express');
const connectDB = require('./db')
require('dotenv').config()
const userRouter = require ('./routes/usersRoute')

//Setting up express app
const app = express();
app.use(express.json())

app.use('/user', userRouter)

const PORT = process.env.PORT || 3000;


//Starting server
app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT)
    connectDB()
})