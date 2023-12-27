"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_json_validator_middleware_1 = require("express-json-validator-middleware");
const customError_1 = require("../customError");
const logger_1 = require("../../helpers/logger");
const ErrorLogHandler = (err, req, res, next) => {
    const logger = logger_1.Log.getLogger();
    if (err instanceof express_json_validator_middleware_1.ValidationError) {
        return next(err);
    }
    if (err instanceof customError_1.CustomError) {
        return next(err);
    }
    logger.error(err.stack);
    next(err);
};
exports.default = ErrorLogHandler;
//# sourceMappingURL=errorLogHandler.js.map