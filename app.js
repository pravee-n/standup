var express = require('express');
var app = express();
app.set('view engine', 'jade');
var config = require('./config.js');
var Lockit = require('lockit');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');


// express middleware
// ...
// sessions are required
app.use(cookieParser());
app.use(cookieSession({
  secret: 'hello'
}));
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))


var lockit = new Lockit(config);

app.use(lockit.router);

// you now have all the routes like /login, /signup, etc.
// and you can listen on events. For example 'signup'
lockit.on('signup', function(user, res) {
  console.log('a new user signed up');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});