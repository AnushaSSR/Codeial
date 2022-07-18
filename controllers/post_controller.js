const Post = require('../models/post');
const Comment = require('../models/comment');

//not needed just one level of call back
module.exports.create = async function (req, res) {
    try {
        //let created when creating the post using AJAX
        let post= await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: post
                },

                message: "Post created!"
                
            })
        }

        req.flash('success', 'Post published!');
        return res.redirect('back');
    } catch (err) {
        req.flash('err', err);
        return;
    }

}


// module.exports.display = function(req, res) {
//     Post.find({user:user_id},function(err,post){
//         if(err) {console.log("error in fetching posts"); return}
//         return res.redirect('back');
//     });
// }


module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        //.id means converting object id into string

        if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({ post: req.params.id });

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
    
                    message: "Post deleted"
                    
                })
            }
    

            req.flash('success', 'Post and comments deleted');


            return res.redirect('back');

        } else {
            req.flash('error', 'you cant delete the post');


            return res.redirect('back');
        }

    } catch (err) {
        req.flash('error', err);

        console.log('Error', err);
        return res.redirect('back');

    }

}
