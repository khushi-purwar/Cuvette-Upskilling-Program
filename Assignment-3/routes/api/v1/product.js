const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const ProductControllers= require('../../../controllers/api/v1/product-controller');

//  creating a product
router.post('/create', [

    body("name").not().isEmpty().withMessage("Name is either not provided or empty!"),
    body("description").isLength({min:10}).withMessage("Minimum length should be 10! "),
    body("category").not().isEmpty().withMessage("Category is either not provided or empty!"),
    body("price").isFloat({gt:0}).withMessage("Price must be greater than 0"),
    body("qty").isFloat({gt:0}).withMessage("Quantity must be greater than 0"),

], ProductControllers.createProduct);

//  getting all product details
router.get('/findAll', ProductControllers.getAllProduct);

//  getting product based on id
router.get('/findById/:id', ProductControllers.getAProduct);

// updating a product by id
router.put('/update/:id', [

    body("price").isFloat({gt:0}).withMessage("Price must be greater than 0"),
    body("qty").isFloat({gt:0}).withMessage("Quantity must be greater than 0"),

], ProductControllers.updateProduct);


// deleting a product
router.delete('/delete/:id', ProductControllers.deleteProduct);

module.exports = router;