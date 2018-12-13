const express = require('express')

const user = require('./user');

const product =require('./product')

const router = express.Router()

router.use('/auth', user);

router.use('/auth',product);    

module.exports = router;
