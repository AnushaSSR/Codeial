//commnets controllers
const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const Like = require('../models/likes');


module.exports.create = async function(req, res){

    // console.log('new comment created');

    try{
        // console.log("req.body *******", JSON.stringify(req.body, null, 2));
        // console.log("req.body *******", req.body);
        let post = await Post.findById(req.body.post);
        
        // console.log(JSON.stringify(post, null, 2));
        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();
            // console.log("comment created!", JSON.stringify(comment, null, 2))
            // disabled execPopulate post the mongo 6 version comment = await comment.populate('user', 'name email').execPopulate();
            comment = await comment.populate('user', 'name email');
            // console.log("calling comments mailer");
            // commentsMailer.newComment(comment);


            let job = queue.create('emails', comment).save(function(err){
                if(err){
                    console.log('Error in sending to the queue', err);
                    return;
                }

                // console.log('************************************************************************************Job enqueued', job.id);
            })
            // // if kue doesnt exist, new queue will be created, if it exists we push in the job
            // let job = queueMicrotask.create('emails', comment).save(function(err){
            //     // after save function the job.id is available
            //     if(err){
            //         console.log('error in creating queue');
            //         return;
            //     }
            //     // whenever something is enewueued that id will be availbale there
            //     console.log('job enqueued', job.id);
            // });

            if (req.xhr) {
                // Similar for comments to fetch the user's id!

                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment created!"
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

            // CHANGE :: destroy the associated likes for this comment

            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

            // let post = Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

            // send the comment id which was deleted back to the views
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Comment deleted!"
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