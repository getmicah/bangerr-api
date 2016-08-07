var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	twitter: {
		id: String,
		token: String,
		username: String,
		displayName: String
	},
	dateCreated: String
});

module.exports = mongoose.model('User', UserSchema);