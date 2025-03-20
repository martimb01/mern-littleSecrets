const express = require('express');
const User = require('../models/userModel')
const router = express.Router()
const {registerUser, loginUser, userDetails} = require('../controllers/userController')
const JWTauthMiddleware = require('../controllers/JWTauthController')


//Just for testing the JWT
router.get('/', JWTauthMiddleware, async (req,res) => {
    try{
        const testio = req.user
        const users = await User.find({}) 
        console.log(users)
        res.status(200).json({users, testio})
    } catch (err) {
        console.log(err.message)
    }
})

// Register an user
router.post('/register', registerUser)

// Log-in for users
router.post('/login', loginUser )

// Log-out for users

//Get user details after login
router.get('/me', JWTauthMiddleware, userDetails)




module.exports = router;