const { application } = require('express');
const express = require('express');

// const router, function
const router =express.Router();

const home_controller = require('../controllers/home_controller')

// use the controller, / is teh url index router home controller
// root to the routes
router.get('/',home_controller.home);

router.use('/users', require('./user'));
router.use('/posts',require('./posts'));
// router.use('/profile', require('./profile'));

// for any further routes, access from here
//router.use('/routename', require('./routefile));


console.log('router loaded');
// to be exported to made it available to index.js
module.exports = router; 
