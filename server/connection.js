'use strict';
const Sequelize = require('sequelize');
require('dotenv').config({
    path: './.env'
});

const sequelize = new Sequelize(
    process.env.MYSQL_DB,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD, {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        logging: true,
        define: {
            timestamps: true
        },
        dialectOptions: {
            connectTimeout: 30000
        }
    });

sequelize.authenticate()
    .then(() => {
        console.error(`Database connected: ${process.env.MYSQL_DB}`);
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

module.exports = sequelize;