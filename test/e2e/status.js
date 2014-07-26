var expect = require('chai').expect;
var server = require('../../lib/server');
var api = require('../api-helper')(); 
var db = require('../../lib/db');
var app = server(['hello']); 
var Status = require('../../lib/models/status');

describe('Status Feature', function () {

    before(function () {
        db.initialize(config);
        app.start();
    });

    it('should create a status', function (done) {
        var newStatus = {
            username: 'testuser' + moment().valueOf(),
            status: 'test status' + moment().valueOf()
        };

        var createStatusEndpoint = {
            url: '/status',
            method: 'POST',
            body: JSON.stringify(newStatus)
        };

        api(createStatusEndpoint, function (err, res, body) {
            expect(err).to.not.exist;
            expect(res.statusCode).to.equal(200);
            Status.findOne(newStatus, function (err, status) {
                expect(retrievedStatus.username).to.equal(newStatus.username);
                expect(retrievedStatus.status).to.equal(newStatus.status);
                done();
            });
        });
    });

    it('should retrive a status');
    it('should modify a status');
    it('should remove a status')
});
