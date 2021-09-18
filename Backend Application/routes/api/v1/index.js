const express = require('express');
const router = express.Router();

router.use('/consumer', require('./auth') );

router.use('/admin', require('./admin/auth') );

router.use('/product', require('./product') );

router.use('/cart', require('./cart') );

module.exports = router;