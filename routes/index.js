const { application } = require('express');
const express = require('express');

// const router, function
const router =express.Router();

const home_controller = require('../controllers/home_controller')

// use the controller, / is teh url
router.get('/',home_controller.home);

console.log('router loaded');
// to be exported to made it available to index.js
module.exports = router; 
