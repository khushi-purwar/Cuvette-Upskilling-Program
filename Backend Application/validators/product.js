const {body, validationResult} = require('express-validator')

exports.ValidateProductRequest = [
    body('name').notEmpty().withMessage("name is required!"),
    body('price').isFloat({gt:0}).withMessage("Price must be greater than 0!"),
    body('qty').isFloat({gt:0}).withMessage("Quantity must be greater than 0!"),
    body('desc').notEmpty().isLength({min : 5}).withMessage("Description cannot be empty and of atleast 5 characters long! "),
]

exports.isRequestValidated = (req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    next();
}