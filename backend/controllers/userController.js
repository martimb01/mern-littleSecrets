
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    try {
        const user = req.body;
        if (!user.username || !user.email || !user.password || !user.firstName || !user.lastName || !user.dateOfBirth)  {
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
                                      email: user.email,
                                      firstName: user.firstName,
                                      lastName: user.lastName,
                                      dateOfBirth: user.dateOfBirth})
            await newUser.save()
            res.status(201).json({message: 'User created sucessfuly!!', userFields: newUser})
            console.log('New user created', newUser)
        }
    } catch (err) {
        console.log('Something went very wrong!', err)
        res.status(500).json({ message: 'Something went very wrong registering user!' })
    }
}

const loginUser = async (req,res) => {
    try{
        const user = await User.findOne({username: req.body.username})
        if (!user) {
            console.log('User with that username does not exist')
            res.status(500).json({message: 'Invalid username or password!', devMessage: 'Username does not exist'})
            return
        }

        if ( await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: '1h'})
            res.status(200).json({message: 'Logged-In!', token})
        } else {
            res.status(500).json({message: 'Invalid username or password!', devMessage: 'Password for that username is incorrect!'})
        }

    } catch (err) {
        console.log(err.message)
    }
}

const updateUser = async(req, res) => {
    try{
        const user = await User.findById(req.user.id)

        if (!user) {
             return res.status(400).json({message: "User by that id does not exist!"})
        }

        //If password is being updated, hash it before updating user in db
        if(req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            {$set: req.body},
            {new: true}
        )
        console.log('Succesful user update!')
        res.status(200).json({message: 'User has been updated!', updatedUser})

    } catch (err) {
        console.log (err.message)
        res.status(500).json({message: 'Something went very wrong updating user!'})
    }
}

const userDetails = async (req,res) => {
    try{
        const user = await User.findById(req.user.id)
        if(!user) {
          return res.status(404).json({message: "User by that id not found!"})
        }
        res.status(200).json({message:'User Found!', user} )

    } catch (err) {
        console.log(err.message)
    }
}

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


module.exports = {registerUser, loginUser, userDetails, updateUser}