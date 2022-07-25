const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (req, res){

    try{

        let post = await Post.findById(req.body.post);
        
        if (post){

            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();

        if (req.xhr){
            // Similar for comments to fetch the user's id!
            comment = await comment.populate('user', 'name').execPopulate();

            return res.status(200).json({
                data: {
                    comment: comment
                },
                message: "Post created!"
            });
        }


        req.flash('success', 'Comment published!');

            res.redirect('/');
        }
    }catch(err){
        req.flash('error', err);

        return;
    }

}


module.exports.destroy = async function(req, res){

    try{
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id){
            
            //before dleteinhg thecomment we b=have to fetch the post id and go inside it and then delete the comment
            let postId = comment.post;

            comment.remove();
            //$pull featrure of the mongoose with throws out id matching the comments id

            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
            
            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted!"
                });
        }


            req.flash('success', 'Comment deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized');
            
            return res.redirect('back');

        }
    }catch(err){
        req.flash('error', err);
        return;
    }

}