// to get the expresss

const express = require('express');
const app = express();

//to get the port, default is 80, we will go by 8000
const port= 8000;


// helps to seperate app and routes and controllers
// once exported tell app to use it

app.use('/',require('./routes'));


// make the app listen to the port
app.listen(port,function(err){
    if(err) {
        console.log(`Error in loading the server : ${err}`);
    }
    console.log(`Server is up and running: ${port}`);
});