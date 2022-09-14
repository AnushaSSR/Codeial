// to get the expresss
const express = require('express');
// import the env to access the paths
const env = require('./config/environment');

// import th emorgan for the logging
const logger = require('morgan');

// to get the cookie parser
const cookieParser = require('cookie-parser');
const app = express();

//to get the port, default is 80, we will go by 8000
const port= 8000;
// to get the library of express ejs layouts
const expressLayouts = require('express-ejs-layouts');
// import mongosse
const db= require('./config/mongoose');
// user for session cookie
const session = require('express-session');

// for authentication
//need to require both, for this to work
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle= require('./config/passport-google-outh2-strategy');

const MongoStore= require('connect-mongo');
const sassMiddleware= require('node-sass-middleware');
const flash= require('connect-flash');
const customMware= require('./config/middleware');

//setting up the chat server to be used with socket.io
//created chat server and passed on teh app to it
 const chatServer = require('http').Server(app);
//defined chat socket
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log("Chat server is listening on port 5000");

//define the paths as part of the change in the env
const path = require('path');

//requred to be run only in th edevc environment
//modif after env changes
app.use(sassMiddleware({

    src: path.join(__dirname, env.asset_path, 'scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),
    //false whenin production
    debug:'true',
    outputStyle: 'extended',
    prefix: '/css'
}))

// get the url
app.use(express.urlencoded());

// tell app to use it in the middleware, because whn requets is coming in the cooklie need to be parsed
app.use(cookieParser());

//use the assets folder
//for prod
//change: after env 
app.use(express.static(env.asset_path));

// app.use(express.static('./assets'));

//logger 

app.use(logger(env.morgan.mode , env.morgan.options));

 // to be required before routes
app.use(expressLayouts);


app.use('/uploads', express.static(__dirname + '/uploads'));

// extract style and script from sub pages to layout
app.set('layout extractStyles',true);
app.set('layout extractLayouts',true);


// helps to seperate app and routes and controllers
// once exported tell app to use it

//set up the view engine
// to get the views, set the view engine to ejs
app.set('view engine', 'ejs');
// specify the path to get the views from
app.set('views','./views');

//mongo store is used to store session cookie
app.use(session({
    name: 'codeial',
    //todo chamge secret before deploymrntmin productin mode
//change: after env 
//env after the env is used
    secret:env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/codeial-development',
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        })
}));

app.use(passport.initialize());
app.use(passport.session());

//set current user's usage
app.use(passport.setAuthenticatedUser);
//flash after session being used
app.use(flash());
app.use(customMware.setFlash);
app.use('/',require('./routes'));


// make the app listen to the port
app.listen(port,function(err){
    if(err) {
        console.log(`Error in loading the server : ${err}`);
    }
    console.log(`Server is up and running: ${port}`);
});