const { application } = require('express');
const express = require('express');

// const router function
const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');

// use the controller, / is teh url index router home controller
// root to the routes
router.get('/', homeController.home);
router.use('/users', require('./user'));
router.use('/posts', require('./posts'));
//comments router is required
router.use('/comments', require('./comments'));


// router.use('/profile', require('./profile'));

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));


// to be exported to made it available to index.js
module.exports = router; 