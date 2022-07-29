const passport= require('passport');
const { deleteOne } = require('../models/post');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
opts.secretOrKey = 'secret';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne(jwt_payload._id, function(err, done) {
        if (err) {
            return ;
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
// const JwtStrategy = require('passport-jwt').Strategy;

// // module which help us to extract jwt.
// const ExtractJwt = require('passport-jwt').ExtractJwt;

// const User= require('../models/user');


// let opts= {}
//     opts.JwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//     opts.secretOrKey = "codeial";


// passport.use(new JwtStrategy(opts, function(jwtPayLoad,callback){
// //find user based on the payload info
//       User.findById(jwtPayLoad._id, function(err, user){
//         if(err) {console.log("Error in finding user from JWT"); return callback(err,false); }
//         if (user){
//             return callback(null, user);
//         }else {
//             return callback(null, false); 
//         }
//     })
// }));

module.exports = passport;