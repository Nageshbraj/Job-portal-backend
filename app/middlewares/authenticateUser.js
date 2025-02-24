const jwt = require('jsonwebtoken')

const authenticateUser = (req,res,next) => {
    const token = req.headers['authorization']
    if(!token){
        return res.status(400).json({error: 'token is required'})
    }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)
         req.user = tokenData
         next()
    } catch(err){
        return res.status(500).json({error: err})
    }
}

module.exports = authenticateUser
