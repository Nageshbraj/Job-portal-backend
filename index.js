const express = require('express')
const cors = require('cors')
require('dotenv').config()
const configureDB = require('./config/db')
const {checkSchema} = require('express-validator')
const userRegisterValidationSchema = require('./app/validations/user-register-validator')
const userLoginValidationSchema = require('./app/validations/user-login-validator')
const userCtlr = require('./app/controllers/users-cltr')
const jobsCtlr = require('./app/controllers/jobs-cltr')
const candidatesCltr = require('./app/controllers/candidates-cltr')
const recruiterCtlr = require('./app/controllers/recruiter-cltr')
const applicationsCltr = require('./app/controllers/application-cltr')
const authenticateUser = require('./app/middlewares/authenticateUser')
const authorizeUser = require('./app/middlewares/authorizeUser')
const {candidateValidationSchema, candidateEditValidationSchema} = require('./app/validations/candidate-validator')
const {recruiterValidationSchema, recruiterEditValidationSchema} = require('./app/validations/recruiter-validator')
const {applicationValidationSchema, applicationTrackSchema } = require('./app/validations/application-validator')
const jobValidationSchema = require('./app/validations/job-validator')
const app = express()
const port = 3333
configureDB()

app.use(express.json())
app.use(cors())

//application level middleware - useing for logging request for debug purpose
app.use(function(req,res,next){
    console.log(`${req.ip} - ${req.method} - ${req.url} - ${new Date()}`)
    next()
})

app.post('/users/register', checkSchema(userRegisterValidationSchema), userCtlr.register)

app.post('/users/login', checkSchema(userLoginValidationSchema), userCtlr.login)

app.get('/users/account', authenticateUser, userCtlr.account)
app.get('/users/checkemail', userCtlr.checkEmail)


app.get('/api/jobs', jobsCtlr.list)
app.get('/api/jobs/my', authenticateUser, authorizeUser(['recruiter']), jobsCtlr.my)
app.get('/api/jobs/:id', jobsCtlr.show)
app.get('/api/jobs/:id/applications', authenticateUser, authorizeUser(['recruiter']), jobsCtlr.applications)
app.get('/api/jobs/:id/applications/:appId', authenticateUser, authorizeUser(['recruiter']), jobsCtlr.singleApplication)

app.put('/api/jobs/:id/applications/:appId', authenticateUser, authorizeUser(['recruiter']), jobsCtlr.applicationUpdate)
app.post('/api/jobs', authenticateUser, authorizeUser(['recruiter']), checkSchema(jobValidationSchema), jobsCtlr.create)

app.delete('/api/jobs/:id', authenticateUser, authorizeUser(['recruiter']), jobsCtlr.remove)
app.put('/api/jobs/:id', authenticateUser, authorizeUser(['recruiter']), checkSchema(jobValidationSchema), jobsCtlr.update)

app.post('/api/candidates/profile', authenticateUser, authorizeUser(['candidate']), checkSchema(candidateValidationSchema), candidatesCltr.create)

app.get('/api/candidates/profile', authenticateUser, authorizeUser(['candidate']), candidatesCltr.show)

app.put('/api/candidates/profile', authenticateUser, authorizeUser(['candidate']), checkSchema(candidateEditValidationSchema),candidatesCltr.update)

app.post('/api/recruiters/profile', authenticateUser, authorizeUser(['recruiter']), checkSchema(recruiterValidationSchema), recruiterCtlr.create)

app.get('/api/recruiters/profile', authenticateUser, authorizeUser(['recruiter']), recruiterCtlr.show)

app.put('/api/recruiters/profile', authenticateUser, authorizeUser(['recruiter']), checkSchema(recruiterEditValidationSchema), recruiterCtlr.update)

app.post('/api/applications', authenticateUser, authorizeUser(['candidate']), checkSchema(applicationValidationSchema), applicationsCltr.apply)
app.get('/api/applications/check/:jobId', authenticateUser, authorizeUser(['candidate','recruiter']), applicationsCltr.check)

app.get('/api/applications', authenticateUser, authorizeUser(['recruiter']), applicationsCltr.list)

app.listen(port, () => {
    console.log('connected to server to port', port)
})
