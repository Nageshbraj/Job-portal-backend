const Recruiter = require('../models/recruiter-model')

const recruiterValidationSchema = {
    userId: {
        in: ['body'],
        exists: {
            errorMessage: 'userId is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'userId cannot be empty'
        },
        custom: {
            options: async function(value, {req}){
                const recruiter = await Recruiter.findOne({userId: req.user.id})
                if(recruiter){
                    throw new Error('profile already taken')
                } else {
                    return true
                }
            }
        }
    },
    firstName: {
        in: ['body'],
        exists: {
            errorMessage: 'firstName is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'firstName cannot be empty'
        }
    },
    lastName: {
        in: ['body'],
        exists: {
            errorMessage: 'lastName is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'lastName cannot be empty'
        }
    },
    mobile: {
        in: ['body'],
        exists: {
            errorMessage: 'mobile is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'mobile cannot be empty'
        },
        isLength: {
            options: {min:10, max:10},
            errorMessage: 'mobile should be 10 digits long'
        },
        isNumeric: {
            errorMessage: 'mobile number should be in number format'
        },
        custom: {
            options: async function(value){
                const recruiter = await Recruiter.findOne({mobile: value})
                if(recruiter){
                    throw new Error('mobile number already taken')
                } else {
                    return true
                }
            }
        }
    },
    companyName: {
        in: ['body'],
        exists: {
            errorMessage: 'companyName is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'companyName cannot be empty'
        }
    },
    address: {
        in: ['body'],
        exists: {
            errorMessage: 'address is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'address cannot be empty'
        }
    }
}


const recruiterEditValidationSchema = {
    firstName: {
        in: ['body'],
        exists: {
            errorMessage: 'firstName is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'firstName cannot be empty'
        }
    },
    lastName: {
        in: ['body'],
        exists: {
            errorMessage: 'lastName is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'lastName cannot be empty'
        }
    },
    mobile: {
        in: ['body'],
        exists: {
            errorMessage: 'mobile is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'mobile cannot be empty'
        },
        isLength: {
            options: {min:10, max:10},
            errorMessage: 'mobile should be 10 digits long'
        },
        isNumeric: {
            errorMessage: 'mobile number should be in number format'
        }
    },
    companyName: {
        in: ['body'],
        exists: {
            errorMessage: 'companyName is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'companyName cannot be empty'
        }
    },
    address: {
        in: ['body'],
        exists: {
            errorMessage: 'address is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'address cannot be empty'
        }
    }
}
module.exports = {recruiterValidationSchema, recruiterEditValidationSchema}