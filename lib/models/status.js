var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var statusSchema = mongoose.Schema({
    userId: { type: ObjectId, required: true },
    status: String,
});

module.exports = mongoose.model('Status', statusSchema);
