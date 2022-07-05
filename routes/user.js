// route of users

const express = require('express');
const router = express.Router();


const user_controller = require('../controllers/user_controller');
const post_controller= require('../controllers/post_controller');
// create a route to profile
router.get('/profile', user_controller.profile);

//to get the user signup page



router.get('/sign-up',user_controller.signup);




// // to get the user login page


router.get('/sign-in',user_controller.signin);


// route for dign up page

router.post('/create', user_controller.create);

// assignmebt to create a post route


router.get('/posts', post_controller.posts);

module.exports =router;