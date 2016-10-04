const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

let userSchema = new Schema({
	email: String,
	password: String,
	username: String,
	displayName: String,
	newUser: Boolean,
	followers: [String],
	following: [String]
}, {
	timestamps: true
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
