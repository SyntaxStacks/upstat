module.exports = function HelloWorldApi (app) {
    
    app.get('/', function (req, res) {
        res.send('hello world');
    });

    app.get('/ohrly', function (req, res) {
        res.send('hello wut wut');
    });
};
