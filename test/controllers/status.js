var moment = require('moment');
var statusController = require('../../lib/controllers/status');
var mongoose = require('mongoose');
var statusModel = require('../../lib/models/status');
var stubbedModel = { '_id': 0, 'userId': 0, 'status': 'status' };
var statusStub;

describe('Status Controller', function () {

    beforeEach(function () {
    });

    afterEach(function () {
        statusStub.restore();
    });

    it('should create a status', function () {
        statusStub = sinon.stub(statusModel, 'create').returns({
            save: sinon.stub().yields(null, stubbedModel)
        });
        var req = {};
        req.body = {
            username: 'testuser' + moment().valueOf(),
            status: 'test status' + moment().valueOf()
        };

        var res = { send: sinon.spy() };
        statusController.create(req, res);
        expect(statusStub).to.be.calledWith(req.body);
        expect(res.send).to.be.called;
    });

    it('should list all status', function () {
        statusStub = sinon.stub(statusModel, 'find').yields(null, stubbedModel);
        var req = {};
        req.body = {
            username: 'testuser' + moment().valueOf(),
            status: 'test status' + moment().valueOf()
        };

        var res = { send: sinon.spy() };
        statusController.listAllStatuses(req, res);
        expect(statusStub).to.be.calledOnce;
        expect(res.send).to.be.calledWith(stubbedModel);
    });

    it('should modify a status', function () {
        var updateStub = { update: sinon.stub().yields(null, {}) } 
        statusStub = sinon.stub(statusModel, 'findOne').yields(null, updateStub);
        var req = {
            body: {
                username: 'testuser' + moment().valueOf(),
                status: 'test status' + moment().valueOf()
            },
            params: {
                statusId: ''
            }
        };

        var res = { send: sinon.spy() };
        statusController.update(req, res);
        expect(statusStub).to.be.calledOnce;
        expect(updateStub.update).to.be.calledOnce;
        expect(res.send).to.be.called;//With({ status: "status updated" });
      
    });

    it('should remove a status')
});
