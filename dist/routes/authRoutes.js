"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = require("express");
const express_json_validator_middleware_1 = require("express-json-validator-middleware");
const authController_1 = require("../controllers/auth/authController");
const authSchemas_1 = require("../schema/authSchemas");
// Assign router to the express.Router() instance
const router = (0, express_1.Router)();
const { validate } = new express_json_validator_middleware_1.Validator({ schemas: [authSchemas_1.loginSchema] });
const authController = new authController_1.AuthController();
router.post("/login", validate({ body: authSchemas_1.loginSchema }), authController.login);
exports.AuthRoute = router;
//# sourceMappingURL=authRoutes.js.map