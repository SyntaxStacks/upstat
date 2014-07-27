var _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db');
var config = require('./config');

module.exports = function server (routeFileNames) {

    var app = express();
    app.use(bodyParser.json());
    var port = config.port;
    var apiPath = config.apiPath;
    _.each(routeFileNames, function (routeFile) {
        var rt = require(apiPath + routeFile);
        rt(app);
    });

    app.start = function () {
        console.log('establishing db connection');
        db.initialize(config);
        console.log('Running server on port: ' + port );
        app.server = require('http').createServer(app);
        app.server.listen(port);
    };

    app.stop = function () {
        console.log('disconnecting db connection');
        db.close();
        console.log('stopping server');
        app.server.close();
    };

    return app;
};
