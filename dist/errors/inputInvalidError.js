"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = require("./customError");
const constants_1 = require("../config/constants");
class InputInvalidError extends customError_1.CustomError {
    constructor(message) {
        super(message ? message : "Input value invalid");
        this.statusCode = constants_1.Constants.RESPONSE_STATUS_CODE.FAIL_CODE;
        Object.setPrototypeOf(this, InputInvalidError.prototype);
    }
    serializeErrors() {
        return [
            {
                message: this.message
            },
        ];
    }
}
exports.default = InputInvalidError;
//# sourceMappingURL=inputInvalidError.js.map