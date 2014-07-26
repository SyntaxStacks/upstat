var mongoose = require('mongoose');

var database = {
    initialize: function (config) {
        database.host = config.mongodb.host || 'mongodb://localhost/test';
        mongoose.connect(database.host);
    },
    request: function (requestFn) {
        database.db = mongoose.connection;
        database.db.on('error', console.error.bind(console, 'connection error:'));
        database.db.once('open', requestFn);
    }
};

module.exports = database;
