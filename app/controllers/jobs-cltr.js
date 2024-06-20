const Job = require("../models/job-models")
const { validationResult} = require('express-validator')
const Application = require('../models/application-model')

const jobsCtlr = {}

jobsCtlr.list = async (req,res) => {
    try {
        const job = await Job.find()
            res.json(job)
    } catch(err){
        res.status(500).json({errors: 'something went wrong'})
    }
}


jobsCtlr.create = async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
    const body = req.body
    const job = new Job(body)
    job.recruiter = req.user.id
    await job.save()
    res.status(201).json(job)
    } catch(err){
        res.status(500).json({errors: 'something went wrong'})
    }
}

jobsCtlr.my = async (req,res) => {
    try {
        const jobs = await Job.find({recruiter: req.user.id})
        res.json(jobs)
    } catch(err){
        res.status(500).json({errors: 'something wemt wrong'})
    }
}

jobsCtlr.show = async (req, res) => {
    const id = req.params.id 
    try {
        const job = await Job.findById(id)
        res.json(job)
    } catch(err) {
        console.log(err) 
        res.status(500).json({ error: 'something went wrong'})
    }
}


jobsCtlr.update = async (req, res) => {
    const id = req.params.id 
    const body = req.body 

    const job = await Job.findOneAndUpdate({ recruiter: req.user.id, _id: id }, body, { new: true })
    if(!job) {
        return res.status(404).json({ error: 'record not found'})
    }
    res.json(job) 
}

jobsCtlr.remove = async (req, res) => {
    const id = req.params.id 
    const job = await Job.findOneAndDelete({ recruiter: req.user.id, _id: id })
    if(!job) {
        return res.status(404).json({ error: 'record not found'})
    }
    res.json(job) 
}


jobsCtlr.applications  = async (req,res) => {
    const id = req.params.id
    const job = await Job.findOne({ _id: id, recruiter: req.user.id})
    if(!job){
        return res.status(404).json({error: 'record not found'})
    }

    const applications = await Application.find({ job: job._id })
    res.json(applications)
}

jobsCtlr.singleApplication = async (req,res) => {
    const id = req.params.id
    const appId = req.params.appId
    const job = await Job.findOne({ _id: id, recruiter: req.user.id})
    if(!job){
        return res.status(404).json({error: 'record not found'})
    }

    const application = await Application.findOne({ _id: appId, job: job._id})
    res.json(application)
}


jobsCtlr.applicationUpdate = async (req,res) => {
    const id = req.params.id
    const appId = req.params.appId
    const body = req.body
    const job = await Job.findOne({ _id: id, recruiter: req.user.id})
    if(!job){
        return res.status(404).json({error: 'record not found'})
    }

    const application = await Application.findOneAndUpdate({ _id: appId, job: id }, body, {new: true})
    res.json(application)

}



module.exports = jobsCtlr
