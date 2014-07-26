var expect = require('chai').expect;
var server = require('../../lib/server');
var api = require('../api-helper')(); 
var app = server(['hello']); 

describe('Status API', function () {

    before(function () {
        app.start();
    });

    it('should create a status', function (done) {
        var helloWorldEndpoint = {
            url: '/',
            method: 'GET'
        };

        api(helloWorldEndpoint, function (err, res, body) {
            expect(body).to.eql('hello world');
            done();
        });
    });
    it('should retrive a status');
    it('should modify a status');
    it('should remove a status')
});
