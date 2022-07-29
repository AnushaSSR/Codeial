// route of users
const express = require('express');
const router = express.Router();
//import passport
const passport = require('passport');


const usersController = require('../controllers/user_controller');

// create a route to profile
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);
  
//to get the user signup page
router.get('/sign-up', usersController.signUp);

// // to get the user login page
router.get('/sign-in', usersController.signIn);


// route for sign up page

router.post('/create', usersController.create);


// to create a session, create a route
// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);
// assignmebt to create a post route

router.get('/auth/google', passport.authenticate('google',{scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}, usersController.createSession));


// router.get('/posts', post_controller.posts);

module.exports = router;