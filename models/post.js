const mongoose = require('mongoose');


const courseScores = new mongoose.Schema({
    course_dsa: {
        type: Number,
        required: true,

    },
    course_webd: {
        type: Number,
        required: true,
        
    },
    course_dsa: {
        type: Number,
        required: true,
        
    },
    course_react: {
        type: Number,
        required: true,   
    }
},{
    timestamps: true
});

const CourseScores = mongoose.model('courseScores', ScoresSchema);

module.exports = CourseScores;
