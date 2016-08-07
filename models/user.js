var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	full_name: String,
	email: String,
	password: String,
	date_created: String
});

module.exports = mongoose.model('User', UserSchema);