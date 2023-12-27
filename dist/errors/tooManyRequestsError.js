"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = require("./customError");
const constants_1 = require("../config/constants");
class TooManyRequestsError extends customError_1.CustomError {
    constructor(message) {
        super(message ? message : "Too many requests.");
        this.statusCode = constants_1.Constants.RESPONSE_STATUS_CODE.TOO_MANY_REQUESTS;
        Object.setPrototypeOf(this, TooManyRequestsError.prototype);
    }
    serializeErrors() {
        return [
            {
                message: this.message
            },
        ];
    }
}
exports.default = TooManyRequestsError;
//# sourceMappingURL=tooManyRequestsError.js.map