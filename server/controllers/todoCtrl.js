'use strict';
const helper = require('../util/helper');
const constants = require('../constants.json');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const models = require('../models/index');
const todoModel = models.todos;


exports.createTodo =async (req, res) => {
    try {
    const result = await todoModel.create(req.body)
    res.status(constants.HTTP_STATUS.INSERT);
    res.json(result);
    } catch (error) {
        console.log("🚀 ~ file: todoCtrl.js ~ line 21 ~ exports.createTodo= ~ error", error)
        error = await helper.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        })
    }
};

exports.updateTodo =async (req, res) => {
    try {
        const {body} = req
        const result = await todoModel.update(body, {
            where: {
                id: body.id,
                is_deleted: 0
            },
            raw: true
        })
        res.status(constants.HTTP_STATUS.UPDATE);
        res.json(result);
        } catch (error) {
            error = await helper.errorCommon(error);
            res.status(error.status);
            res.json({
                message: error.message
            })
        }
};

exports.getTodo =async (req, res) => {
    try {
        const {params:{id}} =req
        const result = await todoModel.findOne({
            where: {
                id: id
            },
            raw: true
        })
        res.status(constants.HTTP_STATUS.SELECT);
        res.json(result);
        } catch (error) {
            error = await helper.errorCommon(error);
            res.status(error.status);
            res.json({
                message: error.message
            })
        }
};

exports.getTodos = async (req, res) => {
    try {
        const result =await todoModel.findAll()
        res.status(constants.HTTP_STATUS.INSERT);
        res.json(result);
        } catch (error) {
            error = await helper.errorCommon(error);
            res.status(error.status);
            res.json({
                message: error.message
            })
        }
};

exports.deleteTodo = async (req, res) => {
    try {
        const {query:{id}} = req
        const result = await todoModel.destroy({ where: { id} })
        console.log("🚀 ~ file: todoCtrl.js ~ line 86 ~ exports.deleteTodo ~ result", result)
        res.status(constants.HTTP_STATUS.INSERT);
        res.json(result);
        } catch (error) {
            error = await helper.errorCommon(error);
            res.status(error.status);
            res.json({
                message: error.message
            })
        }
};







