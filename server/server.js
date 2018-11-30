var express = require('express');
const session = require('express-session');
var passport = require('passport');
var router = require('./routes/routes.js')
var path = require('path');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

// session storing 
const sessionOptions = { 
    secret: 'S3CR3T',
	saveUninitialized: false, 
    resave: false,
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    cookie: {
        path: '/',
        httpOnly: false,
        maxAge: 24*60*60*1000
    }
};
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://cyong813:cyong813@ds161487.mlab.com:61487/coffee');

app.use('/', router);

module.exports = app;