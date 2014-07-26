var mongoose = require('mongoose');
var statusSchema = mongoose.Schema({
    username: String,
    status: String,
    created: Number
});

module.exports = mongoose.model('Status', statusSchema);
