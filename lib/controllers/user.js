var _ = require('lodash');
var async = require('async');
var md5 = require('MD5');
var User = require('../models/user');

module.exports = {
    list: function listUsers (req, res) {
        User.find(function (err, users) {
            res.send(users);
        })
    },

    create: function createUser (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var passwordConfirm = req.body.passwordConfirm;
        if (!_.isEqual(password, passwordConfirm)) {
            res.statusCode = 500;
            res.send({ error: 'passwords do not match' });
            return;
        }

        var user = {
            username: username,
            passwordHash: md5(password)
        };

        var userModel = User.create(user);
        userModel.save(function (err, savedUser) {
            if (err) {
                res.statusCode = 500;
                res.send(err);
                return;
            }

            res.statusCode = 201
            res.send(savedUser);
        });
    },

    update: function updateUser (req, res) {
        var userId = req.params.userId;
        var update = req.body;
        var findUser = function (callback, results) {
            User.findOne({ id: userId }, callback);
        };
        var updateUser = function (callback, results) {
            results.find.update(update, callback);
        };
        var flow = {
          find: findUser,
          update: ['find', updateUser]
        };
        async.auto(flow, function (err, results) {
            if (err) {
                res.statusCode = 500;
                res.send(err);
                return;
            }

            res.statusCode = 200;
            res.send({ status: "user updated" });
        });
    },

    remove: function removeUser (req, res) {
        var userId = req.params.userId;
        var findUser = function (callback, results) {
            User.findOne({ id: userId }, callback);
        };
        var removeUser = function (callback, results) {
            results.find.remove(callback);
        };
        var opts = {
            find: findUser,
            remove: ['find', removeUser]
        };
        async.auto(opts, function (err, results) {
            if (err) {
                res.statusCode = 500;
                res.send(err);
                return;
            }

            res.statusCode = 200;
            res.send({ status: "user removed" });
        });
    }
};
