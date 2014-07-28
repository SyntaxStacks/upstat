var moment = require('moment');
var mongoose = require('mongoose');
var async = require('async');
var config = require('../config');
var Status = require('../../lib/models/status');
var db = require('../../lib/db');

function getNewStatus () {
    return {
        userId: mongoose.Types.ObjectId(),
        status: 'test status' + moment().valueOf()
    };
}

describe('Status Model', function () {

    before(function (done) {
        db.initialize(config, done);
    });

    after(function () {
        db.close();  
    })

    it('should create a status', function (done) {
        var newStatus = getNewStatus(); 
        var statusModel = new Status(newStatus);
        statusModel.save(function (err, status) {
            expect(err).to.not.exist;
            expect(status).to.exist;
            done();
        });
    });

    it('should retrive a status', function (done) {
        var newStatus = getNewStatus(); 
        var createStatus = function (callback) {
            var statusModel = new Status(newStatus);
            statusModel.save(callback);
        };
        var findStatus = function (callback, results) {
            Status.findOne(newStatus, callback);
        };
        var opts = {
            create: createStatus,
            find: ['create', findStatus]
        };
        async.auto(opts, function (err, results) {
            retrievedStatus = results.find;
            expect(err).to.not.exist;
            expect(retrievedStatus.username).to.equal(newStatus.username);
            expect(retrievedStatus.status).to.equal(newStatus.status);
            done();
        });
    });

    it('should modify a status', function (done) {
        var newStatus = getNewStatus(); 
        var createStatus = function (callback) {
            var statusModel = new Status(newStatus);
            statusModel.save(callback);
        };
        var findStatus = function (callback, results) {
            Status.findOne(newStatus, callback);
        };
        var updateStatus = function (callback, results) {
            results.find.update({ status: 'updated' }, callback);
        };
        var flow = {
          create: createStatus,
          find: ['create', findStatus],
          update: ['find', updateStatus]
        };
        async.auto(flow, function (err, results) {
            var updateResults = results.update[1];
            var updateOk = updateResults.ok;
            var documentsAffected = updateResults.n;
            var updatedExistingStatus = updateResults.updatedExisting;
            expect(documentsAffected).to.equal(1);
            expect(updatedExistingStatus).to.be.true;
            expect(updateOk).to.be.true;
            expect(err).to.not.exist;
            done();
        });
    });

    it('should remove a status', function (done) {
        var newStatus = getNewStatus(); 
        var createStatus = function (callback) {
            var statusModel = new Status(newStatus);
            statusModel.save(callback);
        };
        var findStatus = function (callback, results) {
            Status.findOne(newStatus, callback);
        };
        var removeStatus = function (callback, results) {
            results.find.remove(callback);
        };
        var opts = {
            create: createStatus,
            find: ['create', findStatus],
            remove: ['find', removeStatus]
        };
        async.auto(opts, function (err, results) {
            expect(err).to.not.exist;
            done();
        });
    });
});
