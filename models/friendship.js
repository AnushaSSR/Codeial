const mongoose = require("mongoose");

const friendshipSchema = new mongoose.Schema({
    // the suser who sents the request
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
// the user who accepted the request, the naming is just to undersyand, the uers wont see a difference 
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},{
    timestamps: true
});

const Friendship = mongoose.model('Friendship', friendshipSchema);
module.exports = Friendship;