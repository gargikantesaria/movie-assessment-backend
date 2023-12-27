import { NextFunction, Request, Response } from "express";
import { ResponseMessages } from "../../config/response_messages";
import { InputInvalidError } from "../../errors";
import NotFoundError from "../../errors/notFoundError";
import UnauthorisedError from "../../errors/unauthorisedError";
import { Jwt } from "../../helpers/jwt";

export class AuthMiddleware {

    // Check Token Exist || Check Token Valid || Get userId by decoding token
    public validateAndGetDataFromJWT = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // check if token is available
            if (!req.headers.authorization || req.headers.authorization == null) {
                throw new UnauthorisedError(ResponseMessages.common.jwtToken.ERR_TOKEN_NOT_EXIST);
            }

            // verify token
            const token = req.headers.authorization;
            const verifyToken = await Jwt.verifyAuthToken(token);
            if (!verifyToken) {
                throw new UnauthorisedError(ResponseMessages.common.jwtToken.ERR_TOKEN_NOT_VALID);
            }

            const decoded = Jwt.decodeJWTToken(token.toString());
            if (!decoded || !decoded.payload) {
                throw new NotFoundError(ResponseMessages.common.jwtToken.ERR_USER_UNAUTHORISED);
            }

            req.body.__Jwt = decoded.payload;
            return next();
        } catch (err) {
            return next(err);
        }
    }
}