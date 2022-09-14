 const mongoose = require("mongoose");
const likeSchema = new mongoose.Schema({
    //likes belongs to the user
    user: {
        type: mongoose.Schema.ObjectId
    },
    //store two things type on which like is placed and the object on which like is placed
    //type could be post or comment and type could be the like or post object

    //objcet on which like is placed

    //this defines the object id of the liked object
    likeable :{
        type: mongoose.Schema.ObjectId ,
        require: true,
        //placing a path to the some other field and that field is going to define  on which type of obj the like is placed
        //refpath decide which other property , the type of the object
        refPath: 'onModel',
    },
    //this field is used for defining the typeof the liked object since this is a dynamic reference
    //omnmodel property onlikes
    onModel: {
        type:String,
        required: true,
        enum:['Post', 'Comment']
    }
},{

    timestamps:true
});
    

const Like = mongoose.model('Like', likeSchema);
 module.exports= Like;