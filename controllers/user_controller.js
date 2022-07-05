// export user from models

const User = require('../models/user');
// render profile page

module.exports.profile = function(req,res){
    return res.render('user_profile', {
        title:"Profile Page"
    });
}


//render signin page
module.exports.signin = function(req,res){
    return res.render('user_sign_in', {
        title:"Codeial | Sign in "
    });
}

//render signup page
module.exports.signup= function(req,res){

    return res.render('user_sign_up',{
        title : "Codeial | Sign Up"
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
    //TODO later
}
