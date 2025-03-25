const express = require('express')
const router = express.Router();
const {createSecret, checkSecretAccess} = require('../controllers/secretController')
const JWTauthMiddleware = require('../controllers/JWTauthController')

router.post('/create', JWTauthMiddleware, createSecret)
router.post('/verify', JWTauthMiddleware, checkSecretAccess)

module.exports = router;