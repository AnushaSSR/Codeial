const Post = require('../models/post');
const Comment = require('../models/comment');

//not needed just one level of call back
module.exports.create = async function (req, res) {
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        return res.redirect('back');
    } catch (err) {
        console.log('Error', err);
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
            return res.redirect('back');

        } else {
            return res.redirect('back');
        }

    } catch (err) {
        console.log('Error', err);
        return;

    }

}
