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
exports.AuthService = void 0;
const typeorm_1 = require("typeorm");
const tokenPayload_1 = __importDefault(require("../controllers/auth/tokenPayload"));
const baseService_1 = __importDefault(require("./baseService"));
const Errors = __importStar(require("../errors"));
const response_messages_1 = require("../config/response_messages");
const jwt_1 = require("../helpers/jwt");
const aws_1 = require("../helpers/aws");
const usersRepository_1 = __importDefault(require("../repositories/usersRepository"));
class AuthService extends baseService_1.default {
    constructor(tokenInfo) {
        super(tokenInfo);
        this.aws = new aws_1.Aws();
        // login user & create token
        this.loginUserAndCreateToken = async (email, password) => {
            const user = await this.userRepository.getUserByEmail(email);
            // check user exist
            if (!user) {
                throw new Errors.NotFoundError(response_messages_1.ResponseMessages.common.ERR_LOGIN_FAILED);
            }
            // check password is valid
            const passwordIsValid = await this.userRepository.checkPassword(password, user.password);
            if (!passwordIsValid) {
                throw new Errors.NotFoundError(response_messages_1.ResponseMessages.common.ERR_LOGIN_FAILED);
            }
            delete user.password;
            return this.createToken(user);
        };
        // create JWT token
        this.createJwtToken = async (user_uuid) => {
            const jwtTokenObj = new tokenPayload_1.default(user_uuid);
            return jwt_1.Jwt.getAuthToken(jwtTokenObj);
        };
        this.userRepository = (0, typeorm_1.getCustomRepository)(usersRepository_1.default);
    }
    // create token
    async createToken(user) {
        const data = user;
        // create jwt auth token
        const createdJwtToken = await this.createJwtToken(user.user_uuid);
        delete user.password;
        return {
            access_token: createdJwtToken,
            data: data
        };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=authService.js.map