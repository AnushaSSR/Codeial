const passport= require('passport');

const JwtStrategy = require('passport-jwt').Strategy;

// module which help us to extract jwt.
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User= require('../models/user');


let opts= {
    JwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
    secretOrKey : "codeial"
}


passport.use(new JwtStrategy(opts, function(jwtPayLoad,callback){
    User.findById(jwtPayLoad._id, function(err, user){
        if(err) {console.log("Error in finding user from JWT"); return; }

        if (user){
            return callback(null, user);
        }else {
            return callback(null, false); 
        }
    })
}));

module.exports = passport;