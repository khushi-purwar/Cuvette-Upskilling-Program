const express = require('express');
const Router = express.Router();

// middlewares
const { verifyToken , adminMiddleware} = require('../../../middlewares/index');

const path = require('path');

// controllers
const { createProduct, getProducts } = require('../../../controllers/api/v1/product')

//  multer configurations
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname) , 'uploads'))
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname)
    }
  })

const upload = multer({ storage })

// validations
const { ValidateProductRequest, isRequestValidated } = require('../../../validators/product')

// creating a product
Router.post('/create' , verifyToken, adminMiddleware , upload.array('productImg'), ValidateProductRequest, isRequestValidated, createProduct )

// getting a product
Router.get('/:id' , getProducts )

module.exports = Router;