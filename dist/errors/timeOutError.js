"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = require("./customError");
const constants_1 = require("../config/constants");
class TimeOutError extends customError_1.CustomError {
    constructor(message) {
        super(message ? message : "Page/method not found");
        this.statusCode = constants_1.Constants.RESPONSE_STATUS_CODE.TIMEOUT_CODE;
        Object.setPrototypeOf(this, TimeOutError.prototype);
    }
    serializeErrors() {
        return [
            {
                message: this.message
            },
        ];
    }
}
exports.default = TimeOutError;
//# sourceMappingURL=timeOutError.js.map