const bcrypt = require('bcrypt')
const Secret = require('../models/secretModel')

const createSecret = async (req,res) => {
    try {
        const secret = req.body;
        if (!secret.name || !secret.password) {
            console.log('Both fields need to be completed')
            return res.status(400).json({message:"Both fields need to be completed"})
        }
    
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(secret.pasword, salt)
    
        const newSecret = new Secret ({
            name: secret.name,
            password: hashedPassword,
            creatorId: req.user.id
        })

        await newSecret.save()
        console.log('New secret created!')
        res.status(200).json({message:"New secret created!", data: newSecret})

    } catch (err) {
        console.log(err.message)
        res.status(500).json({message:"Something went very wrong creating a new secret!"})
    }
}

module.exports = {createSecret}

