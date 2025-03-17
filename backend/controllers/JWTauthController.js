const jwt = require('jsonwebtoken')

//Authentication middleware
const JWTauthMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization')

    if (!authHeader) {
        console.log('Auth header does not exist!')
        return res.status(401).json({message: "No auth header provided!"})
    }

    const token = authHeader.replace('Bearer ', '');
    
    if(!token || token === 'Bearer' ) {
        console.log('Missing the good ol token')
        return res.status(401).json({message: 'No token!'})
    }

    try {
        const jwtVerify = jwt.verify(token, process.env.JWT_SECRET)
        req.user = jwtVerify
        next()
    } catch (err) {
        console.log(err.message)
        res.status(401).json({message: 'JWT token not valid!'})
    }
}

module.exports = {JWTauthMiddleware}