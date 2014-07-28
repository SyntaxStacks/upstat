var moment = require('moment');
var server = require('../../lib/server');
var Status = require('../../lib/models/status');
var api = require('../api-helper')(); 
var app = server(['status']); 

describe('Status API', function () {

    before(function () {
        app.start();
    });

    after(function () {
        app.stop();  
    });

    it('should create a status', function (done) {
        var newStatus = {
            username: 'testuser' + moment().valueOf(),
            status: 'test status' + moment().valueOf()
        };

        var createStatusEndpoint = {
            url: '/status',
            method: 'POST',
            body: JSON.stringify(newStatus)
        };

        api(createStatusEndpoint, function (err, res, body) {
            console.log(err);
            console.log(res);
            console.log(body);
            expect(Status.save).to.have.been.calledWith(newStatus);
            done();
        });
    });
    it('should retrive a status');
    it('should modify a status');
    it('should remove a status')
});
