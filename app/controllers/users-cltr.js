const User = require('../models/user-model')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const userCtlr = {}

userCtlr.register = async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const body = req.body
    try {
        const salt = await bcryptjs.genSalt()
        const hashPassword = await bcryptjs.hash(body.password, salt)
        const user = new User(body)
        user.password = hashPassword
        await user.save()
        res.status(201).json(user)

    } catch(err){
        res.status(500).json({errors: 'something is wrong'})
    }
}


userCtlr.login = async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const body = req.body
    try {
        const user = await User.findOne({email: body.email})
        if(user){
            const isAuth = await bcryptjs.compare(body.password, user.password)
            if(isAuth){
                const tokenData = {
                    id: user._id,
                    role: user.role
                }
                const token = jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: '7d'})
                return res.json({token: token})
            }
            return res.status(404).json({errors: 'Invalid email/password'})
        }
         res.status(404).json({errors: 'Invalid email/password'})
    } catch(err){
        res.status(500).json({errors: 'something went wrong'})
    }
}

userCtlr.account = async (req,res) => {
    try {
        const user = await User.findById(req.user.id)
        res.json(user)
    } catch(err){
        res.status(500).json({errors: 'something went wrong'})
    }
}


userCtlr.checkEmail = async (req,res) => {
    const email = req.query.email
    const user = await User.findOne({ email: email })
    if(user) {
        res.json({"is_email_registered": true})
    } else {
        res.json({"is_email_registered": false})
    }
}


module.exports = userCtlr