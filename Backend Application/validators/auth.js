const {body, validationResult} = require('express-validator')

exports.ValidateSignupRequest = [
    body('firstName').notEmpty().withMessage("FirstName is required!"),
    body('lastName').notEmpty().withMessage("LastName is required!"),
    body('email').isEmail().withMessage("Vaild email is required!"),
    body('password').isLength({min : 8}).withMessage("Password must be 8 characters long!"),
]

exports.ValidateSigninRequest = [
  body('email').isEmail().withMessage("Vaild email is required!"),
  body('password').notEmpty().withMessage("Password must be provided!"),
]

exports.isRequestValidated = (req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    next();
}