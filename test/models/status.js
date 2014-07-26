var expect = require('chai').expect;
var moment = require('moment');
var config = require('../config');
var Status = require('../../lib/models/status');
var db = require('../../lib/db');

describe('Status Model', function () {

    before(function () {
        db.initialize(config);
    });

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
        statusModel.save(function (err, savedStatus) {;
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
        var statusModel = new Status(newStatus);
        statusModel.save(function (err, savedStatus) {;
            expect(err).to.not.exist;
            Status.findOne(newStatus, function (err, retrievedStatus) {
                retrievedStatus.update({ status: 'updated' }, function (err, numberAffected) {
                    expect(numberAffected).to.equal(1);
                    expect(err).to.not.exist;
                    done();
                });
            });
        });
    });

    it('should remove a status', function (done) {
        var newStatus = {
            username: 'testuser' + moment().valueOf(),
            status: 'remove test' + moment().valueOf()
        };
        var statusModel = new Status(newStatus);
        statusModel.save(function (err, savedStatus) {;
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
