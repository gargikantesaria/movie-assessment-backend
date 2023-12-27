"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = require("./customError");
const constants_1 = require("../config/constants");
class ConflictError extends customError_1.CustomError {
    constructor(message) {
        super(message ? message : "User already exists");
        this.statusCode = constants_1.Constants.RESPONSE_STATUS_CODE.CONFLICT_CODE;
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
    serializeErrors() {
        return [
            {
                message: this.message
            },
        ];
    }
}
exports.default = ConflictError;
//# sourceMappingURL=conflictError.js.map