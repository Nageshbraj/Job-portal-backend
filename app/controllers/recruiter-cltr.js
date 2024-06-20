const Recruiter = require('../models/recruiter-model')
const {validationResult} = require('express-validator')


const recruiterCtlr = {}

recruiterCtlr.create = async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const body = req.body
        const recruiter = new Recruiter(body)
        recruiter.userId = req.user.id
        await recruiter.save()
        res.json(recruiter)
    } catch(err){
        res.status(500).json({error: 'something went wrong'})
    }
}


recruiterCtlr.show = async (req,res) => {
    try {
        const recruiter = await Recruiter.findOne({userId: req.user.id})
        res.json(recruiter)
    } catch(err){
        res.status(500).json({error: 'something went wrong'})
    }
}


recruiterCtlr.update = async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const body = req.body
        const recruiter = await Recruiter.findOneAndUpdate( {userId: req.user.id}, body, {new:true})
        res.json(recruiter)
    } catch(err){
        res.status(500).json({error: 'something went wrong'})
    }
}


module.exports = recruiterCtlr