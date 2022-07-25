// export user from models
const User = require('../models/user');
// we nee the file system module
const fs = require('fs');
const path = require('path');
// render profile page
// const fs = require('fs');
// const path = require('path');

// let's keep it same as before
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
        //    before rendering the users list 
        // return res.render('user_profile', {
        //     title:"User Profile",

    });

}


// to update the user details
module.exports.update = async function(req, res){

    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         return res.redirect('back');
    //     });
    // }else{
    //     req.flash('error','Unauthorised!');
    //     return res.status(401).send('Unauthorized');
    // }

    if(req.user.id == req.params.id){
        
        try{
           
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if (err) {console.log('*****Multer Error: ', err)}

                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file){

                    if (user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }

                    //to fdelete or upadet if pic alreday exists
                //     if(user.avatar){
                //         fs.unlinkSync(path.join(__dirname, '..' , user.avatar ));

                //     }
                //   //  this is saving the path of the uploaded file into the vataer filed in the user
                    //user current user, avatrarPtha static var hich makes abvatr_path as public 
                    user.avatar = User.avatarPath + '/' + req.file.filename;

                }
                user.save();
                return res.redirect('back');

                // console.log(req.file);
            });

        }catch(err){
            req.flash('error', err);
            return res.redirect('back');


        }


    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }

}


// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}


// get the sign up data
module.exports.create = function(req, res){
    //TODO later
    if (req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        // if(err){console.log('error in finding user in signing up'); return}
        if(err){req.flash('error', err); return}

        if (!user){
            User.create(req.body, function(err, user){
                // if(err){console.log('error in creating user while signing up'); return}
                if(err){req.flash('error', err); return}

                console.log("user created");
                return res.redirect('/users/sign-in');

            })
        }else{
            req.flash('success', 'You have signed up, login to continue!');
            // console.log("User already exists");
            return res.redirect('back');
        }

    });

}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    console.log("page is loading");
    return res.redirect('/');

    // assuming user is alreday signed in

}

module.exports.destroySession = function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  }
//  function(req, res, next){
//     // functiongiven to req by passport.js
//     //  req.logout(function(err) {
//     //     if (err) { return next(err); }
//     req.logout();
//     req.flash('success', 'You have logged out!');
    
//     // assuming user is alreday signed in

//     return res.redirect('/');


// }

