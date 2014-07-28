var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: String,
    passwordHash: String
});

module.exports = mongoose.model('User', userSchema);
