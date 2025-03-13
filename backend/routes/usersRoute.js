const express = require('express');
const User = require('../models/userModel')
const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const user = req.body;
        if (!user.username || !user.email || !user.password) {
            res.status(400).json({ message: 'All fields need to be completed' })
            console.log('Not all fields completed')
        }

        if (constrainsValidator('username', req.body.username, res) || 
            constrainsValidator('password', req.body.password, res) || 
            constrainsValidator('email', req.body.email, res)) {
                return
            } else {
                const newUser = new User(user)
                await newUser.save()
                res.status(201).send(newUser)
                console.log('User Created!')
            }

    } catch (err) {
        res.status(500).json({ message: 'Something went very wrong!' })
        console.log('Something went very wrong!', err)
    }
})

module.exports = router;


//Helper functions
function constrainsValidator(field,toValidate,res) {
    if (field === 'username' ||  field === 'password') {
        if (toValidate.length <= 4)   {
            res.status(400).json({message: `${field} needs to be atleast 5 characters long!`})
            return false
        }
    }

    if (field === 'email') {
        const  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(toValidate)) {
            res.status(400).json({message: 'Invalid email adress'})
            return false
        }
    }

}