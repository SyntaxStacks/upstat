var _ = require('lodash');
var express = require('express');

module.exports = function server (routeFileNames) {

    var app = express();
    var port = 3000;
    var apiPath = './api/';
    _.each(routeFileNames, function (routeFile) {
        var rt = require(apiPath + routeFile);
        rt(app);
    });

    app.start = function () {
        console.log('Running server on port: ' + port );
        app.listen(port);
    };

    return app;
};
