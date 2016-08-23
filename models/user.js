var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	dateCreated: String,
	email: String,
	password: String,
	username: String,
	newUser: Boolean,
	isMaker: Boolean,
	currentPartner: String,
	partners: [String],
	projects: [String],
	skillSet: [String],
	idea: String
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);