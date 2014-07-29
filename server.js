var server = require('./lib/server');

var routes = [
    'status',
    'user',
    'team'
];

server(routes).start();
