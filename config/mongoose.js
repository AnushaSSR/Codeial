const mongoose = require('mongoose');
 
// provide connection to database
mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

//comment error noi nedd of correction
db.on('error', console.error.bind(console, "Error in connecting to MongoDB")); 


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');

});


module.exports = db;
