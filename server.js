var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var users = require('./routes/users');


// App Config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mongodb');


// Middleware
app.use(function(req, res, next) {
	console.log('Somebody has connected');
	next();
});


// Routing
app.route('/')
	.get(index.welcome);

app.route('/users')
	.get(users.findAll)
	.post(users.addUser);

app.route('/users/:user_id')
	.get(users.findById)
	.put(users.updateUser)
	.delete(users.removeUser);


// HTTP Server
app.listen(3000);