// route of users

const express = require('express');
const router = express.Router();
//import passport

const passport = require('passport');


const user_controller = require('../controllers/user_controller');
const post_controller= require('../controllers/post_controller');
// create a route to profile
router.get('/profile', passport.checkAuthentication, user_controller.profile);

//to get the user signup page
router.get('/sign-up',user_controller.signup);

// // to get the user login page
router.get('/sign-in',user_controller.signin);


// route for sign up page

router.post('/create', user_controller.create);


// to create a session, create a route
// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',{failureRedirect: '/users/sign-in'},
), user_controller.createSession);

router.get('/sign-out', user_controller.destroySession);
// assignmebt to create a post route




router.get('/posts', post_controller.posts);

module.exports =router;