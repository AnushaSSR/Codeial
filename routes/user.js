// route of users

const express = require('express');
const router = express.Router();


const user_controller = require('../controllers/user_controller');
const post_controller= require('../controllers/post_controller');
// create a route to profile
router.get('/profile', user_controller.profile);
// assignmebt to create a post route
router.get('/posts', post_controller.posts);

module.exports =router;