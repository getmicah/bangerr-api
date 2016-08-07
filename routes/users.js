var moment = require('moment');
var User = require('../models/user');

exports.findAll = function(req, res) {
	User.find(function(err, users) {
		if (err) {
			res.send(err);
		}
		res.send(users);
	});
};

exports.addUser = function(req, res) {
	var user = new User();
	user.name = req.body.name;
	user.date_created = moment().format('MM/DD/YYYY');
	user.save(function(err) {
		if (err) {
			res.send(err);
		}
		res.send({ 
			message: 'User created!' 
		});
	});
};

exports.findById = function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
		if (err) {
			res.send(err);
		}
		res.send(user);
	});
};

exports.updateUser = function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
		if (err) {
			res.send(err);
		}
		user.name = req.body.name;
		user.date = moment;
		user.save(function(err) {
			if (err) {
				res.send(err);
			}
			res.send({ 
				message: 'User updated!' 
			});
		});
	});
};

exports.removeUser = function(req, res) {
	User.remove({
		_id: req.params.user_id
	}, function(err, user) {
		if (err) {
			res.send(err);
		}
		res.send({ 
			message: 'User deleted!' 
		});
	});	
};