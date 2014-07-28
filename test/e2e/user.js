var async = require('async');
var moment = require('moment');
var mongoose = require('mongoose');
var server = require('../../lib/server');
var api = require('../api-helper')(); 
var db = require('../../lib/db');
var app = server(['user']); 
var User = require('../../lib/models/user');

function getNewUser () {
    return {
        username: 'test' + moment().valueOf(),
        password: 'password',
        passwordConfirm: 'password'
    };
}

describe('User Feature', function () {

    before(function () {
        app.start();
    });

    after(function () {
        app.stop();  
    });

    it('should create a user', function (done) {
        var newUser = getNewUser();

        var createUser = function (callback) {
            var createUserEndpoint = {
                url: '/user',
                method: 'POST',
                body: JSON.stringify(newUser),
            };

            api(createUserEndpoint, function (err, res, body) {
                expect(err).to.not.exist;
                expect(res.statusCode).to.equal(201);
                callback(err, JSON.parse(body));
            });
        };

        var verifyUser = function (callback, results) {
            var userId = results.create._id;
            User.findOne({ _id: userId }, function (err, user) {
                expect(user.username).to.equal(newUser.username);
                done();
            });
        };

        var opts = {
            create: createUser,
            verify: ['create', verifyUser]
        };

        async.auto(opts, done);
    });

    it('should modify a user', function (done) {
        var newUser = getNewUser();

        var createUser = function (callback) {
            var createUserEndpoint = {
                url: '/user',
                method: 'POST',
                body: JSON.stringify(newUser),
            };

            api(createUserEndpoint, function (err, res, body) {
                expect(err).to.not.exist;
                expect(res.statusCode).to.equal(201);
                callback(err, body);
            });
        };

        var updateUser = function (callback, results) {
            var updateUserEndpoint = {
                url: '/user/' + results.create._id,
                method: 'PUT',
                body: JSON.stringify({ user: 'updated' }),
            };

            api(updateUserEndpoint, function (err, res, body) {
                expect(err).to.not.exist;
                expect(res.statusCode).to.equal(200);
                callback(err, body);
            });
            
        };

        var opts = {
            create: createUser,
            update: ['create', updateUser]
        };

        async.auto(opts, done);
    });

    it('should remove a user', function (done) {
        var newUser = getNewUser();

        var createUser = function (callback) {
            var createUserEndpoint = {
                url: '/user',
                method: 'POST',
                body: JSON.stringify(newUser),
            };

            api(createUserEndpoint, function (err, res, body) {
                expect(err).to.not.exist;
                expect(res.statusCode).to.equal(201);
                callback(err, body);
            });
        };

        var removeUser = function (callback, results) {
            var removeUserEndpoint = {
                url: '/user/' + results.create._id,
                method: 'DELETE',
            };

            api(removeUserEndpoint, function (err, res, body) {
                expect(err).to.not.exist;
                expect(res.statusCode).to.equal(200);
                callback(err, body);
            });
            
        };

        var opts = {
            create: createUser,
            remove: ['create', removeUser]
        };

        async.auto(opts, done);
      
    })
});
