var req = require('request');

var api = {
    initialize: function init () {
        api.baseUrl = 'http://localhost:3000';
        return api.api;
    },
    api: function apiHelper (options, callback) {
        options.url = api.baseUrl + options.url;
        req(options, callback);
    }
};

module.exports = api.initialize;

