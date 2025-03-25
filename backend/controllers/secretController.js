const bcrypt = require('bcrypt')
const Secret = require('../models/secretModel')

const getSecrets = async (req,res) => {
    try {
        const secrets = await Secret.find({})

        if (secrets.length == 0) {
            return res.status(200).json({message:"No Secret pages exist!"})
        }
        res.status(200).json({message:"Successful secrets fetch!", secrets})

    } catch (err) {
        console.log(err.message)
        res.status(500).json({message:"Something went very wrong fetching secrets!"})
    }
}

const createSecret = async (req,res) => {
    try {
        const secret = req.body;
        if (!secret.name || !secret.password ||!req.user.id) {
            console.log('Secret needs a name and password!')
            return res.status(400).json({message:"Secret needs a name and password!"})
        }
    
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(secret.password, salt)
    
        const newSecret = new Secret ({
            name: secret.name,
            description: secret.description,
            password: hashedPassword,
            creatorId: req.user.id
        })

        await newSecret.save()
        console.log('New secret created!')
         return res.status(200).json({message:"New secret created!", data: newSecret})

    } catch (err) {
        console.log(err.message)
        res.status(500).json({message:"Something went very wrong creating a new secret!"})
    }
}

const checkSecretAccess = async (req, res) => {
    try {
        const { name, password} = req.body

        if (!name || !password) {
            return res.status(400).json({message:"Secret name and password need to exist!"})   
        }

        const secretToAccess = await Secret.findOne({name})
        if (!secretToAccess) {
            return res.status(404).json({message:"Secret by that name does not exist"})   
        }

        const isPasswordValid = await bcrypt.compare(password, secretToAccess.password)
        if (!isPasswordValid) {
            return res.status(401).json({message:"Wrong secret password!"})
        }

        /* On sucessful access, it return res.secretId as the secret being acessed*/
        return res.status(200).json({message:"Access granted!",
                                    secretName:secretToAccess.name,
                                    secretDescription:secretToAccess.description,
                                    secretId: secretToAccess._id})

    } catch (err) {
        console.log(err.message)
        res.status(500).json({message:"Something went very wrong checking secret access!"})
    }
}

module.exports = {createSecret, checkSecretAccess, getSecrets}

