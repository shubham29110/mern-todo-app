'use strict';
const Joi = require('@hapi/joi');

module.exports = {
    register: Joi.object().keys({
        first_name: Joi.string().trim().min(2).max(100).required(),
        last_name: Joi.string().trim().min(2).max(100).required(),
        email: Joi.string().trim().email().lowercase().min(5).max(100).required(),
        password: Joi.string().trim().min(6).max(18).required()
        }),
    login: Joi.object().keys({
        email: Joi.string().trim().email().lowercase().min(5).max(100).required(),
        password: Joi.string().trim().min(6).max(18).required()
    })
  
};