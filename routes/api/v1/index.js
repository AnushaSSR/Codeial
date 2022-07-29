const express = require('express');

const router = express.Router();

router.use('/posts', require('./posts'));
//  error post this
// router.use('/users', require('./users'));

module.exports= router;