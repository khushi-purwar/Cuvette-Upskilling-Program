const express = require('express');
const app = express();

require('dotenv').config()

// database
const db = require('./config/connection');

// middlewares
app.use(express.json());

app.use('/', require('./routes'));


const port = process.env.PORT;

app.listen(port, ()=>{
    console.log("Server started at port", port);
})