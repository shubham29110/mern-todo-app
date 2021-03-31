'use strict';
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userCtrl');
const userSchema = require('../schemas/userSchema')
const joi = require('../schemas/middleware');



router.post('/login', joi.check(userSchema.login), userCtrl.login);
router.post('/register', joi.check(userSchema.register), userCtrl.register);











module.exports = router;

