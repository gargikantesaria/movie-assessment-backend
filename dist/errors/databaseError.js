"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = require("./customError");
const constants_1 = require("../config/constants");
class DatabaseError extends customError_1.CustomError {
    constructor(message) {
        super(message ? message : "Database error");
        this.statusCode = constants_1.Constants.RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR_CODE;
        Object.setPrototypeOf(this, DatabaseError.prototype);
    }
    serializeErrors() {
        return [
            {
                message: this.message
            },
        ];
    }
}
exports.default = DatabaseError;
//# sourceMappingURL=databaseError.js.map