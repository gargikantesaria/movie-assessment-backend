import * as JWT from "jsonwebtoken";
import { ResponseMessages } from "../config/response_messages";
import UnauthorisedError from "../errors/unauthorisedError";

export class Jwt {
  // get JWT auth token
  public static getAuthToken(payload) {
    return JWT.sign({ payload }, process.env.JWT_SECRET);
  }

  // decode JWT
  public static decodeJWTToken(token) {
    const decodedToken = JWT.decode(token);
    if (decodedToken) {
      return decodedToken;
    } else {
      throw new UnauthorisedError(ResponseMessages.common.jwtToken.ERR_TOKEN_NOT_VALID);
    }
  }

  // Verify the JWT
  public static verifyAuthToken(token) {
    try {
      const verifyToken = JWT.verify(token, process.env.JWT_SECRET);
      return verifyToken;
    } catch (err) {
      throw new UnauthorisedError(ResponseMessages.common.jwtToken.ERR_TOKEN_NOT_VALID);
    }
  }
}