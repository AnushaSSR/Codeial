const { populate } = require('../models/post');
const Post= require('../models/post');

// export a function to make it publically availabele
module.exports.home = function(req,res){
    // console.log(req.cookies);
    // // res.cookie('userid',25);
    // Post.find({}, function(err,posts){
        
    //     return res.render('home', {
    //     title: "Codeial | Home",
    //     posts: posts
    //     });

    // });

    //Populate the user of each post

    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }

    })
    .exec(function(err,posts){
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
            });
    
    });



}