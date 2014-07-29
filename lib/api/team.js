var teamController = require('../controllers/team');

module.exports = function teamApi (app) {
    app.get('/team', teamController.list);
    app.get('/team/:id', teamController.teamDetails);
    app.post('/team', teamController.create);
    app.put('/team/:id', teamController.update);
    app.del('/team/:id', teamController.remove);
};
