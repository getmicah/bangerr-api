var moment = require('moment');
var User = require('../models/user');


module.exports = function(app) {

	app.route('/users')
		.get(function(req, res) {
			User.find(function(err, users) {
				if (err) {
					res.send(err);
				}
				res.send(users);
			});
		})
		.post(function(req, res) {
			var user = new User();
			user.twitter.id = req.body.twitterId;
			user.twitter.token = req.body.twitterToken;
			user.twitter.username = req.body.twitterUsername;
			user.twitter.displayName = req.body.twitterDisplayName;
			user.dateCreated = moment().format('MM/DD/YYYY');
			user.save(function(err) {
				if (err) {
					res.send(err);
				}
				res.send({user});
			});
		});


	app.route('/users/:id')
		.get(function(req, res) {
			if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
				User.findById(req.params.id, function(err, user) {
					if (err) {
						res.send(err);
					}
					res.send(user);
				});
			} else {
				res.send('error: invalid id')
			}
		})
		.put(function(req, res) {
			if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
				User.findById(req.params.id, function(err, user) {
					if (err) {
						res.send(err);
					}
					// UPDATES STUFF
					user.save(function(err) {
						if (err) {
							res.send(err);
						}
						res.send({ 
							message: 'User updated!' 
						});
					});
				});
			} else {
				res.send('error: invalid id')
			}
		})
		.delete(function(req, res) {
			if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
				User.remove({
					_id: req.params.id
				}, function(err, user) {
					if (err) {
						res.send(err);
					}
					res.send({ 
						message: 'User deleted!' 
					});
				});	
			} else {
				res.send('error: invalid id')
			}
		});


	app.route('/users/twitter/:twitter_id')
		.get(function(req, res) {
			User.findOne({'twitter.id': req.params.twitter_id}, function(err, user) {
				if (err) {
					res.send(err);
				}
				res.send(user);
			});
		});

};