const express = require('express');
const User = require('../models/userModel')
const router = express.Router()
const bcrypt = require('bcrypt')

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
        const usernameValidation = await constrainsValidator('username', user.username)
        const passwordValidation = await constrainsValidator('password', user.password)
        const emailValidation = await constrainsValidator('email', user.email)

        if (!usernameValidation.valid) {
            res.status(400).json({message: usernameValidation.message})
            console.log(usernameValidation.message)
            return
        }

        if (!passwordValidation.valid) {
            res.status(400).json({message:'Password needs to be longer!'})
            console.log('Password needs to be longer!')
            return
        }

        if (!emailValidation.valid) {
            res.status(400).json({message: emailValidation.message})
            console.log(emailValidation.message)
            return
        }

        if(usernameValidation.valid && passwordValidation.valid && emailValidation.valid ){
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(user.password, salt)

            const newUser = new User({username: user.username, 
                                      password: hashedPassword, 
                                      email: user.email})
            await newUser.save()
            res.status(201).json({message: 'User created sucessfuly!!', userFields: newUser})
            console.log('New user created', newUser)
        }
    } catch (err) {
        res.status(500).json({ message: 'Something went very wrong!' })
        console.log('Something went very wrong!', err)
    }
})


// Log-in for users
router.post('/login', async (req,res) => {
    try{
        const user = await User.findOne({username: req.body.username})
        if (!user) {
            console.log('User with that username does not exist')
            res.status(500).json({message: 'Invalid username or password!'})
            return
        }

        if ( await bcrypt.compare(req.body.password, user.password)) {
            res.status(200).send('User logged In')
        } else {
            res.status(500).send('Password Incorrect')
        }

    } catch (err) {
        console.log(err.message)
    }
})


//Helper functions
async function constrainsValidator(field,toValidate) {
    
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

    const usernameAlreadyUsed = await User.findOne({username:toValidate})
    const emailAlreadyUsed = await User.findOne({email: toValidate})
    
    if (usernameAlreadyUsed) {
        return {valid: false, message: 'Username already in use'}
    }

    if (emailAlreadyUsed) {
        return {valid: false, message:'Email already in use'}
    }

    return {valid: true}

}

module.exports = router;