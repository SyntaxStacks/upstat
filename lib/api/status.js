var statusController = require('../controllers/status');

module.exports = function StatusApi (app) {
    app.get('/status', statusController.listAllStatuses);
    app.post('/status', statusController.create);
    app.put('/status/:id', statusController.update);
    app.delete('/status/:id', statusController.remove);
    app.get('/users/:userId/status', statusController.listUsersStatuses);
    app.post('/users/:userId/status', statusController.create);
    app.put('/users/:userId/status/:statusId', statusController.update);
    app.delete('/users/:userId/status/:statusId', statusController.remove);
};
