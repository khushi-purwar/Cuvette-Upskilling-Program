const express = require('express');

// controllers
const { signup, signin , signout} = require('../../../controllers/api/v1/auth');

// validation
const { verifyToken} = require('../../../middlewares/index')

const Router = express.Router();

// validations
const { ValidateSignupRequest, isRequestValidated, ValidateSigninRequest } = require('../../../validators/auth')

Router.post('/signup',ValidateSignupRequest, isRequestValidated ,signup);

Router.post('/signin', ValidateSigninRequest , isRequestValidated ,signin);

Router.post('/signout', verifyToken , isRequestValidated ,signout);

module.exports = Router;