const express = require('express')
const router = express.Router()
const {createPost} = require('../controllers/postController')
const JWTauthMiddleware = require('../controllers/JWTauthController')

router.post('/create', JWTauthMiddleware, createPost)

module.exports = router