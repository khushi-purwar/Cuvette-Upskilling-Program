const express = require('express');
const Router = express.Router();

// controllers
const { signup, signin, signout } = require('../../../../controllers/api/v1/admin/auth');

// middleware
const { verifyToken } = require('../../../../middlewares/index');

// validations
const { ValidateSignupRequest, isRequestValidated, ValidateSigninRequest } = require('../../../../validators/auth')

Router.post('/signup', ValidateSignupRequest, isRequestValidated , signup);

Router.post('/signin',ValidateSigninRequest, isRequestValidated ,signin);

Router.post('/signout',verifyToken , isRequestValidated ,signout);


module.exports = Router;