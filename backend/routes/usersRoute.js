const express = require('express');
const User = require('../models/userModel')
const router = express.Router()
const {registerUser, loginUser, userDetails, updateUser} = require('../controllers/userController')
const JWTauthMiddleware = require('../controllers/JWTauthController')


// Register an user
router.post('/register', registerUser)

// Log-in for users
router.post('/login', loginUser )

// Log-out for users
router.put('/update', JWTauthMiddleware, updateUser)

//Get user details after login
router.get('/me', JWTauthMiddleware, userDetails)




module.exports = router;