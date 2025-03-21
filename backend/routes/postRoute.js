const express = require('express')
const router = express.Router()
const {createPost, getPosts, deletePost} = require('../controllers/postController')
const JWTauthMiddleware = require('../controllers/JWTauthController')

router.post('/create', JWTauthMiddleware, createPost)

router.get('/fetchUserPosts', JWTauthMiddleware, getPosts)

router.delete('/delete', JWTauthMiddleware, deletePost )

module.exports = router