import { Router } from "express";
import { Validator } from "express-json-validator-middleware";
import { AuthController } from "../controllers/auth/authController";
import { loginSchema } from "../schema/authSchemas";

// Assign router to the express.Router() instance
const router: Router = Router();
const { validate } = new Validator({ schemas: [loginSchema] });
const authController = new AuthController();

router.post("/login", validate({ body: loginSchema }), authController.login);

export const AuthRoute: Router = router;