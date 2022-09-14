const User= require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/environment');
module.exports.createSession =async function(req,res){
    try{
        let user= await User.findOne({email: req.body.email})
        console.log("user",user);
        console.log("pass",req.body.password);

        if(!user || user.password != req.body.password){
            //422 invalidinput bythe user
            return res.json(422, {
                message: "Invalid username or password"
            });

        }
        return res.json(200 , {
            message: 'Sign in successful, here is your token , keep it safe!',
            data: {
                //change after env on the secret
                token: jwt.sign(user.toJSON(), env.jwt_secret , {expiresIn: '100000'})
            }
        })
    }catch(err){
        console.log('****', err);
        return res.json(500, {
            message: "Internal Server Error"
        });

    }
}
    