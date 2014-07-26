var server = require('./lib/server');

var routes = [
    'hello'
];

server(routes).start();
