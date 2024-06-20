const Candidate = require('../models/candidate-model')

const candidateValidationSchema = {
    userId: {
        custom: {
            options: async function(value, {req}){
                const candidate = await Candidate.findOne({userId: req.user.id})
                if(candidate){
                    throw new Error('profile already created')
                } else {
                    return true
                }
            }
        }
    },
    firstName: {
        exists: {
            errorMessage: 'first name is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'first name cannot be empty'
        }
    },
    lastName: {
        exists: {
            errorMessage: 'last name is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'last name cannot be empty'
        }
    },
    mobile: {
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
                const candidate = await Candidate.findOne({mobile: value})
                if(candidate){
                    throw new Error('Mobile number already taken')
                } else {
                    return true
                }
            }
        }
    },
    address: {
        exists: {
            errorMessage: 'address is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'address cannot be empty'
        }
    }
}


const candidateEditValidationSchema = {
    firstName: {
        in: ['body'],
        exists: {
            errorMessage: 'first name is required'
        },
        notEmpty: {
            errorMessage: 'first name cannot be empty'
        },
        trim: true 
    },
    lastName: {
        in: ['body'],
        exists: {
            errorMessage: 'last name is required'
        },
        notEmpty: {
            errorMessage: 'last name cannot be empty'
        },
        trim: true 
    },
    mobile: {
        in: ['body'],
        exists: {
            errorMessage: 'mobile is required'
        },
        notEmpty: {
            errorMessage: 'mobile cannot be empty'
        },
        isNumeric: {
            errorMessage: 'mobile should be a number'
        }, 
        isLength: {
            options: { min: 10, max: 10 },
            errorMessage: 'mobile should be 10 digits long'
        },
        trim: true 
    },
    address: {
        in: ['body'],
        exists: {
            errorMessage: 'address is required'
        },
        notEmpty: {
            errorMessage: 'address cannot be empty'
        },
        trim: true 
    }
}

module.exports = {
    candidateValidationSchema,
    candidateEditValidationSchema
}
