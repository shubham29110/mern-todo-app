'use strict';
const express = require('express');
const router = express.Router();

const todoCtrl = require('../controllers/todoCtrl');
const todoSchema = require('../schemas/todoSchema')

const joi = require('../schemas/middleware');

router.post('/create', joi.check(todoSchema.createTodo), todoCtrl.createTodo);
router.put('/update',
  todoCtrl.updateTodo);
router.get('/todos',  todoCtrl.getTodos);
router.get('/:id', todoCtrl.getTodo);
router.delete('/delete', todoCtrl.deleteTodo);

module.exports = router;

