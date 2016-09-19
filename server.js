var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


// Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mongodb');


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
	console.log('*');
	next();
});


// Routes
require('./routes/index')(app);


// Go
app.listen(3000);
