const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/likes');

//not needed just one level of call back
module.exports.create = async function (req, res) {
    try{
        //let created when creating the post using AJAX
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if (req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate('user', 'name');

            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }

        req.flash('success', 'Post published!');
        return res.redirect('/');
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }

}


module.exports.destroy = async function (req, res) {

    try {
        let post = await Post.findById(req.params.id);

        //.id means converting object id into string
        if (post.user == req.user.id) {
            //to delete likes on the post and on comments of the post

            //deleting a post deletes the likes on the comments and like on those comments of that post, comments , deletes the posts      
            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({_id: { $in: post.comments }});

            post.remove();

            await Comment.deleteMany({post: req.params.id});


            if (req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success', 'Post and associated comments deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error', err);
        // console.log('Error', err);
        return res.redirect('back');
    }

}


// module.exports.display = function(req, res) {
//     Post.find({user:user_id},function(err,post){
//         if(err) {console.log("error in fetching posts"); return}
//         return res.redirect('back');
//     });
// }

