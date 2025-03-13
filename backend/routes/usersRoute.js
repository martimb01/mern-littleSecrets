const express = require('express');
const User = require('../models/userModel')
const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const user = req.body;
        if (!user.username || !user.password) {
            res.status(400).json({ message: 'All fields need to be completed' })
            console.log('Not all fields completed')
        } else if (user.username.length <= 4) {
            res.status(400).json({ message: 'Username needs to be at least 4 characters long!' })
        } else if (user.password.length <= 4) {
            res.status(400).json({ message: 'Password needs to be at least 4 characters long!' })
        } else {
            const newUser = new User(user)
            await newUser.save()
            res.status(201).send(newUser)
            console.log(newUser)
        }
    } catch (err) {
        res.status(500).json({ message: 'Something went very wrong!' })
        console.log('Something went very wrong!', err)
    }
})

module.exports = router;