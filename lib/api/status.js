var Status = require('../models/status');
var db = require('../db');

module.exports = function StatusApi (app) {
    
    app.get('/status', function (req, res) {
        Status.find(function (err, statuses) {
            res.send(statuses);
        })
    });

    app.post('/status', function (req, res) {
        var statusModel = new Status(req.body);
        statusModel.save(function (err, savedStatus) {
            if (err) {
                res.statusCode = 500;
                res.send(err);
                return;
            }

            res.statusCode = 201
            res.send(savedStatus);
        })
    });
};
