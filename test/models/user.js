var moment = require('moment');
var async = require('async');
var config = require('../config');
var User = require('../../lib/models/user');
var db = require('../../lib/db');

describe('User Model', function () {

    before(function (done) {
        db.initialize(config, done);
    });

    after(function () {
        db.close();  
    })

    it('should create a user', function (done) {
        var newUser = {
            username: 'testuser' + moment().valueOf(),
            passwordHash: 'test user' + moment().valueOf()
        };
        var userModel = new User(newUser);
        userModel.save(function (err, user) {
            expect(err).to.not.exist;
            expect(user).to.exist;
            done();
        });
    });

    it('should retrive a user', function (done) {
        var newUser = {
            username: 'testuser' + moment().valueOf(),
            passwordHash: 'test user' + moment().valueOf()
        };
        var createUser = function (callback) {
            var userModel = new User(newUser);
            userModel.save(callback);
        };
        var findUser = function (callback, results) {
            User.findOne(newUser, callback);
        };
        var opts = {
            create: createUser,
            find: ['create', findUser]
        };
        async.auto(opts, function (err, results) {
            retrievedUser = results.find;
            expect(err).to.not.exist;
            expect(retrievedUser.username).to.equal(newUser.username);
            expect(retrievedUser.user).to.equal(newUser.user);
            done();
        });
    });

    it('should modify a user', function (done) {
        var newUser = {
            username: 'testuser' + moment().valueOf(),
            passwordHash: 'test user' + moment().valueOf()
        };
        var createUser = function (callback) {
            var userModel = new User(newUser);
            userModel.save(callback);
        };
        var findUser = function (callback, results) {
            User.findOne(newUser, callback);
        };
        var updateUser = function (callback, results) {
            results.find.update({ passwordHash: 'updated' }, callback);
        };
        var flow = {
          create: createUser,
          find: ['create', findUser],
          update: ['find', updateUser]
        };
        async.auto(flow, function (err, results) {
            var updateResults = results.update[1];
            var updateOk = updateResults.ok;
            var documentsAffected = updateResults.n;
            var updatedExistingUser = updateResults.updatedExisting;
            expect(documentsAffected).to.equal(1);
            expect(updatedExistingUser).to.be.true;
            expect(updateOk).to.be.true;
            expect(err).to.not.exist;
            done();
        });
    });

    it('should remove a user', function (done) {
        var newUser = {
            username: 'testuser' + moment().valueOf(),
            passwordHash: 'test user' + moment().valueOf()
        };
        var createUser = function (callback) {
            var userModel = new User(newUser);
            userModel.save(callback);
        };
        var findUser = function (callback, results) {
            User.findOne(newUser, callback);
        };
        var removeUser = function (callback, results) {
            results.find.remove(callback);
        };
        var opts = {
            create: createUser,
            find: ['create', findUser],
            remove: ['find', removeUser]
        };
        async.auto(opts, function (err, results) {
            expect(err).to.not.exist;
            done();
        });
    });
});
