var moment = require('moment');
var async = require('async');
var config = require('../config');
var Status = require('../../lib/models/status');
var db = require('../../lib/db');

describe('Status Model', function () {

    before(function (done) {
        db.initialize(config, done);
    });

    after(function () {
        db.close();  
    })

    it('should create a status', function (done) {
        
        var newStatus = {
            username: 'testuser' + moment().valueOf(),
            status: 'test status' + moment().valueOf()
        };
        var statusModel = new Status(newStatus);
        statusModel.save();

        Status.find(newStatus, function (err, status) {
            expect(err).to.not.exist;
            expect(status).to.exist;
          
            done();
        });
    });

    it('should retrive a status', function (done) {
        var newStatus = {
            username: 'testuser' + moment().valueOf(),
            status: 'test status' + moment().valueOf()
        };
        var statusModel = new Status(newStatus);
        statusModel.save(function (err, savedStatus) {
            expect(err).to.not.exist;
            Status.findOne(newStatus, function (err, retrievedStatus) {
                expect(err).to.not.exist;
                expect(retrievedStatus.username).to.equal(newStatus.username);
                expect(retrievedStatus.status).to.equal(newStatus.status);
              
                done();
            });
        });
    });

    it('should modify a status', function (done) {
        var newStatus = {
            username: 'testuser' + moment().valueOf(),
            status: 'update test' + moment().valueOf()
        };
        
        var createStatus = function (callback) {
            var statusModel = new Status(newStatus);
            statusModel.save(callback);
        };

        var findStatus = function (result, callback) {
            Status.findOne(newStatus, callback);
        };

        var updateStatus = function (result, callback) {
            result.status.update({ status: 'updated' }, callback);
        };

        var flow = {
          create: createStatus,
          find: ['create', findStatus],
          update: ['find', updateStatus]
        };

        async.auto(flow, function (err, results) {
                expect(numberAffected).to.equal(1);
                expect(err).to.not.exist;
                done();
        })

    });

    it('should remove a status', function (done) {
        var newStatus = {
            username: 'testuser' + moment().valueOf(),
            status: 'remove test' + moment().valueOf()
        };
        var statusModel = new Status(newStatus);
        statusModel.save(function saveDone(err, savedStatus) {;
            expect(err).to.not.exist;
            Status.findOne(newStatus, function (err, retrievedStatus) {
                retrievedStatus.remove(function (err, destroyedStatus) {
                    expect(err).to.not.exist;
                    done();
                });
            });
        });
    });
});
