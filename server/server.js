var express = require('express');
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

mongoose.connect('mongodb://cyong813:cyong813@ds161487.mlab.com:61487/coffee');

app.use('/', router);

module.exports = app;