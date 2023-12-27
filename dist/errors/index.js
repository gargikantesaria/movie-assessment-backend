"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorisedError = exports.TooManyRequestsError = exports.TimeOutError = exports.NotFoundError = exports.InputInvalidError = exports.DatabaseError = exports.ConflictError = void 0;
var conflictError_1 = require("./conflictError");
Object.defineProperty(exports, "ConflictError", { enumerable: true, get: function () { return __importDefault(conflictError_1).default; } });
var databaseError_1 = require("./databaseError");
Object.defineProperty(exports, "DatabaseError", { enumerable: true, get: function () { return __importDefault(databaseError_1).default; } });
var inputInvalidError_1 = require("./inputInvalidError");
Object.defineProperty(exports, "InputInvalidError", { enumerable: true, get: function () { return __importDefault(inputInvalidError_1).default; } });
var notFoundError_1 = require("./notFoundError");
Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function () { return __importDefault(notFoundError_1).default; } });
var timeOutError_1 = require("./timeOutError");
Object.defineProperty(exports, "TimeOutError", { enumerable: true, get: function () { return __importDefault(timeOutError_1).default; } });
var tooManyRequestsError_1 = require("./tooManyRequestsError");
Object.defineProperty(exports, "TooManyRequestsError", { enumerable: true, get: function () { return __importDefault(tooManyRequestsError_1).default; } });
var unauthorisedError_1 = require("./unauthorisedError");
Object.defineProperty(exports, "UnauthorisedError", { enumerable: true, get: function () { return __importDefault(unauthorisedError_1).default; } });
//# sourceMappingURL=index.js.map