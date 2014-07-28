var _ = require('lodash');
var req = require('request');

var api = {
    initialize: function init () {
        api.baseUrl = 'http://localhost:3000';
        return api.api;
    },
    api: function apiHelper (options, callback) {
        var headers = {
            'content-type': 'application/json'
        };
        options.url = api.baseUrl + options.url;
        options.headers = options.headers || {};
        options.headers = _.merge(headers, options.headers); 
        req(options, callback);
    }
};

module.exports = api.initialize;

