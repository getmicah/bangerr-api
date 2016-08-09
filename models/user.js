var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: String,
	displayName: String,
	photo: String,
	twitter: {
		id: String,
		token: String
	},
	dateCreated: String
});

module.exports = mongoose.model('User', UserSchema);