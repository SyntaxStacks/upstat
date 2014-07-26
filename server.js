var _ = require('lodash');
var express = require('express');
var app = express();

var port = 3000;
var routes = [
    './api/hello'
];

_.each(routes, function (route) {
    var rt = require(route);
    rt(app);
});

console.log('Running server on port: ' + port );
app.listen(port);
