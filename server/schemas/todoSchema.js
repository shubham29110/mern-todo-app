'use strict';
const Joi = require('@hapi/joi');

module.exports = {
    createTodo: Joi.object().keys({
        description:  Joi.string().trim().required(),
        completed: Joi.boolean().required(),
        start_date: Joi.string().trim().required(),
        end_date: Joi.string().trim().required(),
    }),
    updateTodo: Joi.object().keys({
        id:Joi.number().required(),
        description:  Joi.string().trim().required(),
        completed: Joi.boolean().required(),
        start_date: Joi.string().trim().required(),
        end_date: Joi.string().trim().required(),
        is_deleted: Joi.boolean().required(),

    }),
    id: Joi.object().keys({
        id: Joi.number().required()
    })
}