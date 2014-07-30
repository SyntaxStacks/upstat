var host = process.env.DB_PORT_27017_TCP_ADDR || 'localhost';
module.exports = {
    mongodb: {
        host: 'mongodb://'+ host +'/test'
    },
    port: 3000,
    apiPath: './api/'
};
