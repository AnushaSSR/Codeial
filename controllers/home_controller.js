const { populate } = require('../models/post');
const Post = require('../models/post');
const User = require('../models/user');
// export a function to make it publically availabele
//declasres fnc contains async statements
module.exports.home = async function (req, res) {
    //Populate the user of each post
    //try and catch
    try{
        //await for posts
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }

        });

    //await for users
    let users = await User.find({});

    return res.render('home', {
        title: "Codeial | Home",
        posts: posts,
        all_users: users
    });


    }catch(err){
        console.log('Error',err);

    }
    
    

}

//using then
    // Post.find({}).populate('comments').then(function());

    // let posts = Post.find({}).populate('comments').exec();
    // posts.then()