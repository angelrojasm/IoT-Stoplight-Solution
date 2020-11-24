var mongoose = require('mongoose');
require('./mongoose-connection');
var Schema = mongoose.Schema;

var dataSchema = new Schema({
	semaphoreName: String, // String is shorthand for {type: String}
	userId: String,
});

var data = mongoose.model('data', dataSchema);

module.exports = data;
