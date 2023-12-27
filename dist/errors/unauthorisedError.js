"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = require("./customError");
const constants_1 = require("../config/constants");
class UnauthorisedError extends customError_1.CustomError {
    constructor(message) {
        super(message ? message : "User already exists");
        this.statusCode = constants_1.Constants.RESPONSE_STATUS_CODE.UNAUTHORIZED_CODE;
        Object.setPrototypeOf(this, UnauthorisedError.prototype);
    }
    serializeErrors() {
        return [
            {
                message: this.message
            },
        ];
    }
}
exports.default = UnauthorisedError;
//# sourceMappingURL=unauthorisedError.js.map