var mongoose = require('mongoose');
var statusSchema = mongoose.Schema({
    username: String,
    status: String,
    created: { type: Number, required: true}
});

module.exports = mongoose.model('Status', statusSchema);
