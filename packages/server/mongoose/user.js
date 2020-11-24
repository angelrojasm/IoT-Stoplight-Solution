var mongoose = require('mongoose');
require('./mongoose-connection');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: String, // String is shorthand for {type: String}
	email: String,
	password: String,
});

var user = mongoose.model('user', userSchema);

module.exports = user;
