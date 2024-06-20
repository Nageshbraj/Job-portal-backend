
const userLoginValidationSchema = {
    email: {
        in: ['body'],
        exists: {
            errorMessage: 'email is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'email cannot be empty'
        },
        isEmail: {
            errorMessage: 'email should be in valid format'
        },
        normalizeEmail: true,
    },
    password: {
        in: ['body'],
        exists: {
            errorMessage: 'email is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'email cannot be empty'
        },
        isLength: {
            options: {min:8, max: 128},
            errorMessage: 'password should be atleast 8 characters'
        }
    }
}
module.exports = userLoginValidationSchema