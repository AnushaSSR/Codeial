const Post= require('../models/post');
const Comment= require('../models/comment');

module.exports.create = function(req,res){
    Post.findById(req.body.post, function(err,post){
        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err,comment){
                //handle error
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            });
        }
    });
}


module.exports.destroy= function(req,res){
    Comment.findById(req.params.id, function(err,comment){
        if(comment.user == req.user.id){
            //before dleteinhg thecomment we b=have to fetch the post id and go inside it and then delete the comment
            let postId= comment.post;
            comment.remove();
            //$pull featrure of the mongoose with throws out id matching the comments id
            Post.findByIdAndUpdate(postId,{$pull:{comments: req.params.id}}, function(err,post){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
}