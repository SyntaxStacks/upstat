var _ = require('lodash');

module.exports = {
    wrap: function wrapModel (model) {
        return {
            create: function create (properties) {
                return new model(properties);
            },
            find: function find (query, callback) {
                if (!_.isObject(query)) {
                  query = {};
                }
                var cb = _.last(arguments);
                model.find(query, cb);
            },
            findOne: function findOne (query, callback) {
                if (!_.isObject(query)) {
                  query = {};
                }
                var cb = _.last(arguments);
                model.findOne(query, cb);
            },
            remove: function remove (callback) {
                this.remove(callback); 
            }
        };
    }
};
