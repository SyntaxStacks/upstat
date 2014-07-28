var async = require('async');
var moment = require('moment');
var mongoose = require('mongoose');
var server = require('../../lib/server');
var api = require('../api-helper')(); 
var db = require('../../lib/db');
var app = server(['status']); 
var Status = require('../../lib/models/status');

function getNewStatus () {
    return {
        userId: mongoose.Types.ObjectId(),
        status: 'test status' + moment().valueOf()
    };
}

describe('Status Feature', function () {

    before(function () {
        app.start();
    });

    after(function () {
        app.stop();  
    });

    it('should create a status', function (done) {
        var newStatus = getNewStatus();

        var createStatus = function (callback) {
            var createStatusEndpoint = {
                url: '/status',
                method: 'POST',
                body: JSON.stringify(newStatus),
            };

            api(createStatusEndpoint, function (err, res, body) {
                expect(err).to.not.exist;
                expect(res.statusCode).to.equal(201);
                callback(err, body);
            });
        };

        var verifyStatus = function (callback, results) {
            Status.findOne(newStatus, function (err, status) {
                expect(status.username).to.equal(newStatus.username);
                expect(status.status).to.equal(newStatus.status);
                done();
            });
        };

        var opts = {
            create: createStatus,
            verify: ['create', verifyStatus]
        };

        async.auto(opts, done);
    });

    it('should modify a status', function (done) {
        var newStatus = getNewStatus();

        var createStatus = function (callback) {
            var createStatusEndpoint = {
                url: '/status',
                method: 'POST',
                body: JSON.stringify(newStatus),
            };

            api(createStatusEndpoint, function (err, res, body) {
                expect(err).to.not.exist;
                expect(res.statusCode).to.equal(201);
                callback(err, body);
            });
        };

        var updateStatus = function (callback, results) {
            var updateStatusEndpoint = {
                url: '/status/' + results.create._id,
                method: 'PUT',
                body: JSON.stringify({ status: 'updated' }),
            };

            api(updateStatusEndpoint, function (err, res, body) {
                expect(err).to.not.exist;
                expect(res.statusCode).to.equal(200);
                callback(err, body);
            });
            
        };

        var opts = {
            create: createStatus,
            update: ['create', updateStatus]
        };

        async.auto(opts, done);
    });

    it('should remove a status', function (done) {
        var newStatus = getNewStatus();

        var createStatus = function (callback) {
            var createStatusEndpoint = {
                url: '/status',
                method: 'POST',
                body: JSON.stringify(newStatus),
            };

            api(createStatusEndpoint, function (err, res, body) {
                expect(err).to.not.exist;
                expect(res.statusCode).to.equal(201);
                callback(err, body);
            });
        };

        var removeStatus = function (callback, results) {
            var removeStatusEndpoint = {
                url: '/status/' + results.create._id,
                method: 'DELETE',
            };

            api(removeStatusEndpoint, function (err, res, body) {
                expect(err).to.not.exist;
                expect(res.statusCode).to.equal(200);
                callback(err, body);
            });
            
        };

        var opts = {
            create: createStatus,
            remove: ['create', removeStatus]
        };

        async.auto(opts, done);
      
    })
});
