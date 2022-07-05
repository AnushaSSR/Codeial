// to get the expresss

const express = require('express');
// to get the cookie parser

const cookieParser = require('cookie-parser');
//to get the port, default is 80, we will go by 8000
const port= 8000;
// to get the library of express ejs layouts

const expressLayouts = require('express-ejs-layouts');

const app = express();

// import mongosse

const db= require('./config/mongoose');


app.use(express.urlencoded());
// tell app ti use it in the middleware, because whn requets is coming in the cooklie need to be parsed
app.use(cookieParser());

//use the assets folder
app.use(express.static('./assets'));

 // to be required before routes
app.use(expressLayouts);

// extract style and script from sub pages to layout
app.set('layout extractStyles',true)
app.set('layout extractLayouts',true)


// helps to seperate app and routes and controllers
// once exported tell app to use it





app.use('/',require('./routes'));


//set up the view engine
// to get the views, set the view engine to ejs
app.set('view engine', 'ejs');
// specify the path to get the views from
app.set('views','./views');



// make the app listen to the port
app.listen(port,function(err){
    if(err) {
        console.log(`Error in loading the server : ${err}`);
    }
    console.log(`Server is up and running: ${port}`);
});