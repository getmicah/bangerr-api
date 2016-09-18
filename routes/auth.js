var User = require('../models/user');

module.exports = function(app) {

	app.route('/auth/signup')
		.post(function(req, res) {
			var user = new User();
			user.email = req.body.email;
			user.password = user.generateHash(req.body.password);
			user.username = "";
			user.displayName = "";
			user.newUser = true;
			user.save(function(err) {
				if (err) {
					res.send(err);
				}
				res.send({user});
			});
		});

	app.route('/auth/login')
		.post(function(req, res) {
			User.find({
			 	$or: [
					{email: req.body.username},
					{username: req.body.username}
				]
			}, function(err, users) {
				var user = users[0];
				if (err) {
					res.send(err);
				}
				if (!user.validPassword(req.body.password)) {
					res.send();
				} else {
					res.send(user);
				}
			});
		});

};
