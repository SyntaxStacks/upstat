var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var statusSchema = mongoose.Schema({
    userId: { type: ObjectId, required: true },
    status: String,
});

var statusModel = mongoose.model('Status', statusSchema);
statusModel.create = function create (properties) {
    return new statusModel(properties);
};

module.exports = statusModel;
