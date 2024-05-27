const express = require("express")
const router = express.Router()
const User = require('../models/user')

router.post('/register', async(req, res) => {
    const personalData = {
        name: '',
        surname: '',
        address: '',
        phonenumber: 0
    }

    const newUser = new User({
        name: req.body.name, 
        email: req.body.email, 
        personalData: personalData, 
        password: req.body.pwd
    })

    try {
        const user = await newUser.save()
        res.send('User registered successfully')
    } catch (error) {
        return res.status(400).json({error})
    }
})

router.post('/login', async(req, res) => {
    const {email, pwd} = req.body

    try {
        const user = await User.findOne({email: email, password: pwd})
        if(user) {
            const temp = {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user._id
            }
            
            res.send(temp)
        }
        else {
            return res.status(400).json({message: 'Login failed'})
        }
    } catch (error) {
        return res.status(400).json({error})
    }
})

module.exports = router