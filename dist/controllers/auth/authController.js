"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const authService_1 = require("../../services/authService");
const constants_1 = require("../../config/constants");
class AuthController {
    constructor() {
        // login
        this.login = async (req, res, next) => {
            try {
                const authService = new authService_1.AuthService(null);
                const loginAndtokensCreated = await authService.loginUserAndCreateToken(req.body.email, req.body.password);
                res.status(constants_1.Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json(loginAndtokensCreated);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=authController.js.map