const express = require('express')
const router = express.Router()
const {createPost, getPosts} = require('../controllers/postController')
const JWTauthMiddleware = require('../controllers/JWTauthController')

router.post('/create', JWTauthMiddleware, createPost)

router.get('/fetchUserPosts', JWTauthMiddleware, getPosts)

module.exports = router