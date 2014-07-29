var _ = require('lodash');
var async = require('async');
var md5 = require('MD5');
var Team = require('../models/team');

module.exports = {
    list: function listTeams (req, res) {
        Team.find(function (err, teams) {
            res.send(teams);
        })
    },

    create: function createTeam (req, res) {
        var users = req.body.users || [];
        var admins = req.body.admins || [];

        var team = {
            teamname: req.body.teamname,
            users: users,
            admins: admins
        };

        var teamModel = Team.create(team);
        teamModel.save(function (err, savedTeam) {
            if (err) {
                res.statusCode = 500;
                res.send(err);
                return;
            }

            res.statusCode = 201
            res.send(savedTeam);
        });
    },

    teamDetails: function getTeamDetails (req, res) {
        var query = {id: req.params.teamId}
        Team.findOne(query, function (err, teams) {
            res.send(teams);
        })
    },

    update: function updateTeam (req, res) {
        var teamId = req.params.teamId;
        var update = req.body;
        var findTeam = function (callback, results) {
            Team.findOne({ id: teamId }, callback);
        };
        var updateTeam = function (callback, results) {
            results.find.update(update, callback);
        };
        var flow = {
          find: findTeam,
          update: ['find', updateTeam]
        };
        async.auto(flow, function (err, results) {
            if (err) {
                res.statusCode = 500;
                res.send(err);
                return;
            }

            res.statusCode = 200;
            res.send({ status: "team updated" });
        });
    },

    remove: function removeTeam (req, res) {
        var teamId = req.params.teamId;
        var findTeam = function (callback, results) {
            Team.findOne({ id: teamId }, callback);
        };
        var removeTeam = function (callback, results) {
            results.find.remove(callback);
        };
        var opts = {
            find: findTeam,
            remove: ['find', removeTeam]
        };
        async.auto(opts, function (err, results) {
            if (err) {
                res.statusCode = 500;
                res.send(err);
                return;
            }

            res.statusCode = 200;
            res.send({ status: "team removed" });
        });
    }
};
