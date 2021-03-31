'use strict';
const express = require('express');
const app = express();
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const user = require('./routes/user');
const todo = require('./routes/todo');
const cors = require('cors');

require('dotenv').config({
    path: './.env'
});
const constants = require('./constants.json');
const OPEN_APIs = [
    '/user/login',
    '/user/register',
    '/create',
    '/todos',
    '/update',
    // '/todo/delete/:id',
    // '/todo/todos',
    // '/todo/:id',

];

app.use(cors());
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));
app.use(cookieParser());

// Setup logger
app.use(logger(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,bearer');

    // Pass to next layer of middleware
    if (req.method === 'OPTIONS') {
        res.sendStatus(constants.HTTP_STATUS.OK);
    } else {
        if (OPEN_APIs.includes(req.path)) {
            next();
        } else {
            // console.log('req.query',req.query)
            // let token = req.header('authorization')
            // let bearer = (token && token.replace('Bearer ', ''));
            // if (bearer) {
            //     jwt.verify(bearer, process.env.JWT_TOKEN_API_KEY, function (error, success) {
            //         if (error) {
            //             const err = new Error(constants.ERROR.SESSION_EXPIRE);
            //             err.status = constants.HTTP_STATUS.SESSION_ERROR;
            //             err.errors = constants.ERROR.SESSION_EXPIRE;
            //             next(err);
            //         }
            //         req.loginUserData = success;
                    next();
            //     });
            // } else {
            //     const err = new Error(constants.ERROR.SET_TOKEN);
            //     err.status = constants.HTTP_STATUS.PRE_CONDITION_ERROR;
            //     err.errors = constants.ERROR.SET_TOKEN;
            //     next(err);
            // }
        }
    }
});

app.use('/user', user);
app.use('/todo', todo);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error(constants.ERROR.UNAVAILABLE_API);
    err.status = constants.HTTP_STATUS.UNAVAILABLE_API;
    err.errors = constants.ERROR.UNAVAILABLE_API;
    next(err);
});

// Default error handler
app.use((err, req, res, next) => {
    console.log("🚀 ~ file: app.js ~ line 87 ~ app.use ~ err", err)
    res.status(err.hasOwnProperty('status') ? err.status : 500);
    res.json({
        message: err.hasOwnProperty('errors') ? err.errors : err.toString()
    });
});

module.exports = app;