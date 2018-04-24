//Load the express module
const express = require("express");
//Load express-session module for session data
const session = require('express-session');
//Load the body-parser
const bodyParser = require('body-parser');
//Load path module
const path = require('path');

//Create a port for our server
const port = process.env.PORT || 8000;
//Invoke express and store resulting app
const app = express();

//Tell our app to use the "/static" folder to deliver static contents
app.use(express.static(path.join(__dirname, "./static")));
// user the session module; create secret key for encryption
app.use(session({
    name: 'session',
    secret: 'Id0n0tH8mean',
    resave: false,
    saveUninitialized: true,
}));
// use the body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//Set the location for app to find ejs views
app.set('views', path.join(__dirname, './views'));
//Set the view engine so it knows we're using ejs as templating system
app.set('view engine', 'ejs');

//Enter all routes here
let counter = 0; //initialize counter

// root route to render the index.ejs view
app.get('/', function(request, response) {
    request.session['counter'] = counter; //store counter in session
    counter++; //increment counter everytime page is viewed
    response.render("index", {count: request.session['counter']});
})
app.post('/add2', function(request, response) {
    counter++; //add 1 to count here, redirect will add another to count
    response.redirect('/');
})
app.post('/reset', function(request, response) {
    counter = 0; //reset the counter
    response.redirect('/');
})

//Tell the express app to listen on port 8000; this line should come AFTER all of the rules set up
app.listen(port, function(){
    console.log(`listening on port ${port}`);
})