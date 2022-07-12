const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        // indicate it is referring to id in the db of user schema
        ref: "User"
        //timestamp it is refferimg to
    }
},{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
