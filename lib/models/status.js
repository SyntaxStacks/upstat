var _ = require('lodash');
var mongoose = require('mongoose');
var baseModel = require('./base');
var ObjectId = mongoose.Schema.ObjectId;
var statusSchema = mongoose.Schema({
    userId: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    teamId: {
        type: ObjectId,
        required: true,
        ref: 'Team'
    },
    status: String,
});

var statusModel = mongoose.model('Status', statusSchema);
module.exports = baseModel.wrap(statusModel);
