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
        const usernameValidation = constrainsValidator('username', user.username, res)
        const passwordValidation = constrainsValidator('password', user.password, res)
        const emailValidation = constrainsValidator('email', user.email, res)
        if (!usernameValidation.valid) {
            res.status(400).json({message: 'Username needs to be atleast 5 chars long!'})
            console.log('Username needs to be atleast 5 chars long')
            } else if (!passwordValidation.valid) {
                res.status(400).json({message: 'Password needs to be atleast 5 chars long!'})
                console.log('Username needs to be atleast 5 chars long')  
            } else if (!emailValidation.valid) {
                res.status(400).json({message: 'Invalid email'})
                console.log('Invalid email')  
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
            return {valid: false, message: `${field} needs to be alteast 5 characters long!`}
        }
    }

    if (field === 'email') {
        const  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(toValidate)) {
            return {valid: false, message: `Invalid email`}
        }
    }

}