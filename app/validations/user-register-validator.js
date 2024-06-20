const User = require('../models/user-model')
const userRegisterValidationSchema = {
    username: {
        in: ['body'],
        exists: {
            errorMessage: 'username is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'username cannot be empty'
        }  
    },
    email: {
        in: ['body'],
        exists: {
            errorMessage: 'email is required'
        },
        notEmpty: {
            errorMessage: 'email cannot be empty'
        },
        trim:true,
        isEmail: {
            errorMessage: 'email should be a valid format'
        },
        custom: {
            options: async function(value){
                const user = await User.findOne({email: value})
                if(user){
                    throw new Error('email already taken')
                } else {
                    return true
                }
            }
        },
        normalizeEmail: true
    },
    password: {
        in: ['body'],
        exists: {
            errorMessage: 'password is required'
        },
        notEmpty: {
            errorMessage: 'password cannot be empty'
        },
        trim:true,
        isLength: {
            options: {min: 8, max: 128},
            errorMessage: 'password should be between 8 - 128 characters'
        }
    },
    role: {
        in: ['body'],
        exists: {
            errorMessage: 'role is required'
        },
        notEmpty: {
            errorMessage: 'role cannot be empty'
        },
        trim:true,
        isIn: {
            options: [['candidate', 'recruiter']],
            errorMessage: 'role should either be a candidate or recruiter'
        }
    }
}
module.exports = userRegisterValidationSchema