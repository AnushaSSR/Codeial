const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        // indicate it is referring to id in the db of user schema
        ref: 'User'
        
        //timestamp it is refferimg to
    },
    // include the array of ids of all comments in this post schema itself
    comments: [
        {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ]
},{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
