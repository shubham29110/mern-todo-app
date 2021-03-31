'use strict';
const constants = require('../constants.json');

/**
 * Common error function
 * @param req : 
 * @param res : 
 */
exports.errorCommon = async (error) => {
    if (error && error.original && error.original.Error) {
        error.status = constants.HTTP_STATUS.PRE_CONDITION_ERROR;
        error.message = error.original.Error;
    } else if (error && error.errors && error.errors[0].message) {
        error.status = constants.HTTP_STATUS.PRE_CONDITION_ERROR;
        error.message = error.errors[0].message;
    } else if (error && error.message) {
        error.status = constants.HTTP_STATUS.PRE_CONDITION_ERROR;
        error.message = error.message;
    } else {
        error = error;
    }
    error.status = (error.status ? error.status : constants.HTTP_STATUS.INTERNAL_SERVER_ERROR);
    return error;
}




