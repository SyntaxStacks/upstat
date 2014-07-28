var server = require('./lib/server');

var routes = [
    'hello',
    'status'
];

server(routes).start();
