const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req,res){

    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }

        });


    return res.json(200,{
        message: "List of posts",
        posts: posts
    })

} 

module.exports.destroy = async function(req, res){
    
    try{
        let post = await Post.findById(req.params.id);
    
        //.id means converting object id into string
        // if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});

            return res.json(200, {
              message: "post and commnet deleted succesfully"  
            });
        // }else{
        //     req.flash('error', 'You cannot delete this post!');
        //     return res.redirect('back');
        // }

    }catch(err){
        console.log("***Multer error", err);
        return res.json(500,{
            message: "internal server error"
        });
    }

}