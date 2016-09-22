var User = require('../models/user');

module.exports = function(app) {

	app.route('/users')
		// show all user
		.get(function(req, res) {
			User.find(function(err, users) {
				if (err) {
					res.send(err);
				}
				res.send(users);
			});
		})
		// delete all users
		.delete(function(req, res) {
			User.find(function(err, users) {
				if (err) {
					res.send(err);
				}
				User.remove({}, function(err, user) {
					if (err) {
						res.send(err);
					}
					res.send({
						message: 'All Users deleted!'
					});
				});
			});
		});

	app.route('/users/:user')
		// get user with email or username
		.get(function(req, res) {
			User.find({
			 	$or: [
					{email: req.params.user},
					{username: req.params.user}
				]
			}, function(err, users) {
				if (err) {
					res.send(err);
				}
				res.send(users[0]);
			});
		});

	app.route('/users/id/:id')
		// get user with id
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
		// add information to user
		.put(function(req, res) {
			if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
				User.findById(req.params.id, function(err, user) {
					if (err) {
						res.send(err);
					}
					// account setup info
					if (req.body.newUser !== null) {
						user.newUser = req.body.newUser;
					}
					if (req.body.username) {
						user.username = req.body.username;
					}
					if (req.body.displayName){
						user.displayName = req.body.displayName;
					}
					// follow user
					if (req.body.followingUserId) {
						user.following.push(req.body.followingUserId);
					}
					if (req.body.followerUserId) {
						user.followers.push(req.body.followerUserId);
					}
					// unfollow user
					if (req.body.unfollowingUserId) {
						var i = user.following.indexOf(req.body.unfollowingUserId);
						if (i !== -1) {
						    user.following.splice(i, 1);
						}
					}
					if (req.body.unfollowerUserId) {
						var i = user.followers.indexOf(req.body.unfollowerUserId);
						if (i !== -1) {
						    user.followers.splice(i, 1);
						}
					}
					// save user info to mongodb
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
		// delete user with id
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

};
