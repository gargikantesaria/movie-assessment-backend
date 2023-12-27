"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const response_messages_1 = require("../../config/response_messages");
const notFoundError_1 = __importDefault(require("../../errors/notFoundError"));
const unauthorisedError_1 = __importDefault(require("../../errors/unauthorisedError"));
const jwt_1 = require("../../helpers/jwt");
class AuthMiddleware {
    constructor() {
        // Check Token Exist || Check Token Valid || Get userId by decoding token
        this.validateAndGetDataFromJWT = async (req, res, next) => {
            try {
                // check if token is available
                if (!req.headers.authorization || req.headers.authorization == null) {
                    throw new unauthorisedError_1.default(response_messages_1.ResponseMessages.common.jwtToken.ERR_TOKEN_NOT_EXIST);
                }
                // verify token
                const token = req.headers.authorization;
                const verifyToken = await jwt_1.Jwt.verifyAuthToken(token);
                if (!verifyToken) {
                    throw new unauthorisedError_1.default(response_messages_1.ResponseMessages.common.jwtToken.ERR_TOKEN_NOT_VALID);
                }
                const decoded = jwt_1.Jwt.decodeJWTToken(token.toString());
                if (!decoded || !decoded.payload) {
                    throw new notFoundError_1.default(response_messages_1.ResponseMessages.common.jwtToken.ERR_USER_UNAUTHORISED);
                }
                req.body.__Jwt = decoded.payload;
                return next();
            }
            catch (err) {
                return next(err);
            }
        };
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=authMiddleware.js.map