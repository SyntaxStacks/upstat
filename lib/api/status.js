var statusController = require('../controllers/status');

module.exports = function StatusApi (app) {
    app.get('/status', statusController.listAllStatuses);
    app.get('/user/:userId/status', statusController.listUserStatuses);
    app.get('/user/:userId/team/:teamId/status', statusController.userTeamStatuses);
    app.get('/team/:teamId/status', statusController.teamStatuses);

    app.post('/status', statusController.create);
    app.put('/status/:statusId', statusController.update);
    app.delete('/status/:statusId', statusController.remove);
};
