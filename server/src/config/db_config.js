const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME_DEV,
    process.env.DB_USER_DEV,
    process.env.DB_PAS_DEV,
    {
        dialect: 'postgres',
        host: process.env.HOST_DEV,  
        port: process.env.DB_PORT_DEV,
        logging: console.log
    }
);

module.exports = sequelize;
