const mongoose = require('mongoose');
 
// provide connection to database
mongoose.connect("mongodb://localhost/codeial_development");

const db= mongoose.connection;

db.on('error', console.error.bind(console, "Error in connecting to MongoDB")); 


db.once('open', function(){
    console.log("Conncted to Database :: MongoDB");

});

module.exports = db;
