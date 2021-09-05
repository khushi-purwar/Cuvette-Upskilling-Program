const express = require('express');
const app = express();

const dotenv = require('dotenv').config();
const port = process.env.PORT;

// database
const db = require('./config/mongoose');

// middlewares
app.use(express.json());
app.use('/', require('./routes'));


// starting a server
app.listen(port,(req, res)=>{
    console.log("Server is running at port", port);
})