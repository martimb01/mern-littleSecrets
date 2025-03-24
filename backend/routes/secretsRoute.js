const express = require('express')
const router = express.Router();
const {createSecret} = require('../controllers/secretController')
const JWTauthMiddleware = require('../controllers/JWTauthController')

router.post('/create', JWTauthMiddleware, createSecret)

module.exports = router;