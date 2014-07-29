var async = require('async');
var Status = require('../models/status');

module.exports = {
    listAllStatuses: function liststatus (req, res) {
        Status.find(function (err, statuses) {
            res.send(statuses);
        })
    },

    listUsersStatuses: function listStatus (req, res) {
        var userId = req.params.userId;
        Status.find({ userId: userId }, function (err, statuses) {
            res.send(statuses);
        })
    },

    create: function createStatus (req, res) {
        var statusModel = Status.create(req.body);
        statusModel.save(function (err, savedStatus) {
            if (err) {
                res.statusCode = 500;
                res.send(err);
                return;
            }

            res.statusCode = 201
            res.send(savedStatus);
        });
    },

    update: function updateStatus (req, res) {
        var statusId = req.params.statusId;
        var update = req.body;
        var findStatus = function (callback, results) {
            Status.findOne({ id: statusId }, callback);
        };
        var updateStatus = function (callback, results) {
            results.find.update(update, callback);
        };
        var flow = {
          find: findStatus,
          update: ['find', updateStatus]
        };
        async.auto(flow, function (err, results) {
            if (err) {
                res.statusCode = 500;
                res.send(err);
                return;
            }

            res.statusCode = 200;
            res.send({ status: "status updated" });
        });
    },

    remove: function removeStatus (req, res) {
        var statusId = req.params.statusId;
        var findStatus = function (callback, results) {
            Status.findOne({ id: statusId }, callback);
        };
        var removeStatus = function (callback, results) {
            results.find.remove(callback);
        };
        var opts = {
            find: findStatus,
            remove: ['find', removeStatus]
        };
        async.auto(opts, function (err, results) {
            if (err) {
                res.statusCode = 500;
                res.send(err);
                return;
            }

            res.statusCode = 200;
            res.send({ status: "status removed" });
        });
      
    }
};
