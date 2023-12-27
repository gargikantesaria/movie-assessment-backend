import { Request, Response, NextFunction } from "express";
import { AuthService } from "../../services/authService";
import { Constants } from "../../config/constants";
import { ResponseMessages } from "../../config/response_messages";

export interface uploadFileInputRequest extends Request {
    files: { shop_logo: File }
}

export class AuthController {

    // login
    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authService = new AuthService(null);
            const loginAndtokensCreated: any = await authService.loginUserAndCreateToken(req.body.email, req.body.password);

            res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json(loginAndtokensCreated);
        } catch (error) {
            next(error);
        }
    }

}