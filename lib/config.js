module.exports = {
    mongodb: {
        host: 'mongodb://'+process.env.DB_PORT_27017_TCP_ADDR+'/test'
    },
    port: 3000,
    apiPath: './api/'
};
