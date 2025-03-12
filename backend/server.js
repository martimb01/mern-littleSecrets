// Importing dependencies
const express = require('express');
const connectDB = require('./db')
require('dotenv').config()

//Setting up express app
const app = express();
app.use(express.json())

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server listening on port' + PORT)
    connectDB()
})