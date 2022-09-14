const { populate } = require('../models/post');
const Post = require('../models/post');
const User = require('../models/user');

// export a function to make it publically availabele
//declasres fnc contains async statements
module.exports.home = async function(req, res){
    //Populate the user of each post
    //try and catch

    try{
                // CHANGE :: populate the likes of each post and comment

        // populate the user of each post
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            //populating likes for the commnets
            populate: {
                path: 'likes'
            }
        }).populate('likes');//to popualte likes for the posts
     //await for users
    let users = await User.find({});

    return res.render('home', {
        title: "Codeial | Home",
        posts:  posts,
        all_users: users
    });


    }catch(err){
        console.log('Error', err);
        return;

    }

}


// module.exports.actionName = function(req, res){}


// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()
