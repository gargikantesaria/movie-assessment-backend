"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_json_validator_middleware_1 = require("express-json-validator-middleware");
const customError_1 = require("../customError");
const ErrorHandler = (err, req, res, next) => {
    if (err instanceof express_json_validator_middleware_1.ValidationError) {
        return res.status(400).json({
            errors: err.validationErrors
        });
    }
    if (err instanceof customError_1.CustomError) {
        return res.status(err.statusCode).json({
            errors: err.serializeErrors()
        });
    }
    return res.status(500).send({
        errors: [{ message: "Internal server error" }]
    });
};
exports.default = ErrorHandler;
//# sourceMappingURL=errorHandler.js.map