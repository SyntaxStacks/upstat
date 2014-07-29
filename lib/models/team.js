var mongoose = require('mongoose');
var baseModel = require('./base');

var teamSchema = mongoose.Schema({
    teamname:  {
        type: String,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

var teamModel = mongoose.model('Team', teamSchema);
module.exports = baseModel.wrap(teamModel);
