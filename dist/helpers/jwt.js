"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jwt = void 0;
const JWT = __importStar(require("jsonwebtoken"));
const response_messages_1 = require("../config/response_messages");
const unauthorisedError_1 = __importDefault(require("../errors/unauthorisedError"));
class Jwt {
    // get JWT auth token
    static getAuthToken(payload) {
        return JWT.sign({ payload }, process.env.JWT_SECRET);
    }
    // decode JWT
    static decodeJWTToken(token) {
        const decodedToken = JWT.decode(token);
        if (decodedToken) {
            return decodedToken;
        }
        else {
            throw new unauthorisedError_1.default(response_messages_1.ResponseMessages.common.jwtToken.ERR_TOKEN_NOT_VALID);
        }
    }
    // Verify the JWT
    static verifyAuthToken(token) {
        try {
            const verifyToken = JWT.verify(token, process.env.JWT_SECRET);
            return verifyToken;
        }
        catch (err) {
            throw new unauthorisedError_1.default(response_messages_1.ResponseMessages.common.jwtToken.ERR_TOKEN_NOT_VALID);
        }
    }
}
exports.Jwt = Jwt;
//# sourceMappingURL=jwt.js.map