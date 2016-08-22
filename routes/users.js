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


	// ID
	app.route('/users/id/:id')
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
					console.log('Updating user!');
					user.newUser = req.body.newUser;
					user.isMaker = req.body.isMaker;
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


	// EMAIL
	app.route('/users/email/:email')
		.get(function(req, res) {
			User.findOne({email: req.params.email}, function(err, user) {
				if (err) {
					res.send(err);
				}
				res.send(user);
			});
		});

};