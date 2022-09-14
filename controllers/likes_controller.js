 const Like = require('../models/likes');
 const Comment = require('../models/comment');
 const Post = require('../models/post');

module.exports  .toggleLike = async function(req,res) {
    try {
        // likes/toggle/?id=abcdef&type= Post, id of likeable
        let likeable;
        let deleted =false;//when we recieve json data based onit we can increment or decrement the count of likes diplayed on page
        
        //find likeable
        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.Id).populate('likes');
            //if post contains other likes, we populate them
//likeable becomes post
        }
        else {
            likeable = await Comment.findById(req.query.id).populate('likes');
            //likeable becomes comment
        }

        //check if a like already exists
        //one user ca like an object once
        let existingLike = await Like.findOne( {
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
            //only an authenticated user can can like
        })

        //if a like alreday exists we will delete it
        if(existingLike) {
            likeable.likes.pull(existingLike._id);
            likeable.save();


            existingLike.remove();
            deleted = true;

        } //else make a new like
        else {

            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            })
            likeable.likes.push(newLike._id);
            likeable.save();
        }

        return res.json(200,{
            message: "Request successfull",
            data: {
                deleted: deleted
            }
        } )

    } catch(err){
       //send AJAX or flash msg, since likes work with ajax we sedn json data
       console.log(err);
       return res.json(500, {
        message: "Internal Server Error"
       });

    }
}