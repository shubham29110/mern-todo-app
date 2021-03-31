'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const helper = require('../util/helper');
const constants = require('../constants.json');
const models = require('../models/index');
const userModel = models.users;
const BCRYPT_ROUND = parseInt(process.env.BCRYPT_ROUND, 10);

exports.register = async (req, res) => {
    try {
        const { body } = req
        body.password = bcrypt.hashSync(body.password, BCRYPT_ROUND);
        const result = await userModel.create(body)
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

exports.login = async (req, res) => {
    try {
        const { body } = req
        const result = await userModel.findOne({ where: { email:body.email } })
        let passwordMatch = await bcrypt.compare(body.password, result.password);
        if (passwordMatch) {
            const JWTToken = jwt.sign({
                id: result.id,
                email: result.email,
                name: `${result.first_name} ${result.last_name}`
            }, process.env.JWT_TOKEN_API_KEY, {
                expiresIn: process.env.JWT_TOKEN_INTERVAL
            });
            let userData = {
                success: true,
                token: JWTToken,
                user_detail: result
            };
            res.status(constants.HTTP_STATUS.INSERT);
            res.json(userData);
        } else {
            res.status(constants.HTTP_STATUS.PRE_CONDITION_ERROR);
            res.json({message: constants.ERROR.INVALID});
        }
   
    } catch (error) {
        error = await helper.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}
