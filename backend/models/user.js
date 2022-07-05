const mongoose = require('mongoose');
// import mongoose-unique-Validator module
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	pwd: { type: String, required: true },
	confirmPwd: { type: String },
	role: { type: String, required: true }
});
userSchema.plugin(uniqueValidator);
const user = mongoose.model('User', userSchema);
module.exports = user;
