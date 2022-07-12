const mongoose= require('mongoose');
const commnetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    //comment bealongs to a user
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    post: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
},{
    timestamps: true
});

const Comment= mongoose.model('Comment', commnetSchema);
module.exports= Comment;