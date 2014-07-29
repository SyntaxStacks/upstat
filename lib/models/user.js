var mongoose = require('mongoose');
var baseModel = require('./base');
var userSchema = mongoose.Schema({
    username: String,
    passwordHash: String
});

var userModel = mongoose.model('User', userSchema);
module.exports = baseModel.wrap(userModel);
