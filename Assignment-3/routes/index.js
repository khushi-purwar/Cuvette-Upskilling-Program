const express = require('express');
const router = express.Router();


router.get('/', (req, res)=>{
    res.send("Home Route!")
})

router.use('/api',require('./api'))

module.exports = router;