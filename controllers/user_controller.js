// export user from models

const passport = require('passport');
const User = require('../models/user');
// render profile page
 

module.exports.profile = function(req,res){
    User.findById(req.params.id, function(err,user){
        return res.render('user_profile', {
            title:"User Profile",
            profile_user: user
        });
    //    before rendering the users list 
    // return res.render('user_profile', {
        //     title:"User Profile",
       
    })
    
}


// to update the user details
module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}

//render signup page
module.exports.signup= function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title : "Codeial | Sign Up"
    });
}

//render signin page
module.exports.signin = function(req,res){
    
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title:"Codeial | Sign in "
    });
}


// get the signup data

module.exports.create= function(req,res){
    //TODO later
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err,user){
        if(err){console.log('error in finding user in signing up'); return}

        if(!user){
            User.create(req.body, function(err,user){
                if(err){console.log('error in creating user while signing up'); return}

                console.log("user created");
                return res.redirect('/users/sign-in');

            })
        }else {
            console.log("User already exists");
            return res.redirect('back');
        }
    });

}



// signin and create a session for user

module.exports.createSession= function(req,res){
    console.log("page is loading");
    return res.redirect('/');
    
    // assuming user is alreday signed in

}

module.exports.destroySession= function(req,res,next){
     // functiongiven to req by passport.js

     req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    
    // assuming user is alreday signed in

     })
}

