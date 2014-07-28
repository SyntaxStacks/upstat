var userController = require('../controllers/user');

module.exports = function userApi (app) {
    app.get('/user', userController.list);
    app.post('/user', userController.create);
    app.put('/user/:id', userController.update);
    app.del('/user/:id', userController.remove);
};
