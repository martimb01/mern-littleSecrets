const express = require('express');
const User = require('../models/userModel')
const route = express.Router()

route.post('/register', async (req,res) => {
    try{
        const user = req.body;
        if (!user.username || !user.password) {
            res.status(400).json({message: 'All fields need to be completed'})
            console.log('Not all fields completed')
        } else if (user.username.length() < 4) {
            res.status(400).json({message: 'Username needs to be atleast 4 characters long!'})
        } else  (user.password.length() < 4) {
            res.status(400).json({message: 'Password needs to be atleast 4 characters long!'})
        }
        const newUser = new User(user)
        await newUser.save()
        res.status(201).send(newUser)
        console.log(newUser)
        }


    } catch (err) {
        console.log('Something went very wrong!')
    }
})