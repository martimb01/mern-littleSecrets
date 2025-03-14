const express = require('express');
const User = require('../models/userModel')
const router = express.Router()

router.get('/', async (req,res) => {
    try{
        const users = await User.find({}) 
        console.log(users)
        res.status(200).send(users)
    } catch (err) {
        console.log(err.message)
    }
})

// Register an user
router.post('/register', async (req, res) => {
    try {
        const user = req.body;
        if (!user.username || !user.email || !user.password) {
            res.status(400).json({ message: 'All fields need to be completed' })
            console.log('Not all fields completed')
            return
        }
        const usernameValidation = constrainsValidator('username', user.username)
        const passwordValidation = constrainsValidator('password', user.password)
        const emailValidation = constrainsValidator('email', user.email)

        if (!usernameValidation.valid) {
            res.status(400).json({message:'Username needs to be longer!'})
            console.log('Username needs to be longer!')
            return
        }

        if (!passwordValidation.valid) {
            res.status(400).json({message:'Password needs to be longer!'})
            console.log('Password needs to be longer!')
            return
        }

        if (!emailValidation.valid) {
            res.status(400).json({message:'Email invalid!'})
            console.log('Email invalid!')
            return
        }

        if(usernameValidation.valid && passwordValidation.valid && emailValidation.valid ){
            const newUser = new User(user)
            await newUser.save()
            console.log('New user created!')
            return
        }
    } catch (err) {
        res.status(500).json({ message: 'Something went very wrong!' })
        console.log('Something went very wrong!', err)
    }
})

router.post('/login', async (req,res) => {
    try{
        const {username, password} = req.body
        const usernameMatch = await User.findOne({ username });
        const passwordMatch = await User.findOne({ password });

        if (!usernameMatch || !passwordMatch) {
            return !usernameMatch ? res.json({message:'Username does not exist'}) : res.json({message:'Password does not exist'})
        }

        console.log('User logged in')
        

        

    } catch (err) {
        console.log(err.message)
    }
})


//Helper functions
function constrainsValidator(field,toValidate) {
    
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

    return {valid: true}

}

module.exports = router;