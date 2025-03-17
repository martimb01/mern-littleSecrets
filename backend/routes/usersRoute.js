const express = require('express');
const User = require('../models/userModel')
const router = express.Router()
const {registerUser, loginUser} = require('../controllers/userController')
const {JWTauthMiddleware} = require('../controllers/JWTauthController')

router.get('/', async (req,res) => {
    try{
        const users = await User.find({}) 
        console.log(users)
        res.status(200).send(users)
    } catch (err) {
        console.log(err.message)
    }
})

// Register an user
router.post('/register', registerUser)


// Log-in for users
router.post('/login', loginUser )




module.exports = router;