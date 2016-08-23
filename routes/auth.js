var moment = require('moment');
var User = require('../models/user');


module.exports = function(app) {

	app.route('/auth/signup')
		.post(function(req, res) {
			var user = new User();
			user.dateCreated = moment().format('MM/DD/YYYY');
			user.email = req.body.email;
			user.password = user.generateHash(req.body.password);
			user.username = "";
			user.newUser = true;
			user.isMaker = false;
			user.save(function(err) {
				if (err) {
					res.send(err);
				}
				res.send({user});
			});
		});
	

	app.route('/auth/login')
		.post(function(req, res) {
			User.findOne({email: req.body.email}, function(err, user) {
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