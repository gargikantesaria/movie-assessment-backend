import TokenPayload from "../controllers/auth/tokenPayload";
import Authorization from "./authorization";
import * as Errors from "../errors";
import { ResponseMessages } from "../config/response_messages";

class BaseService {

    protected authorization: Authorization

    constructor(tokenInfo: TokenPayload) {
        this.authorization = new Authorization(tokenInfo);
    }

    protected authorize = (authorized: boolean) => {
        if (!authorized) {
            throw new Errors.UnauthorisedError(ResponseMessages.common.ERR_UNAUTHORIZED);
        }
    }
}

export default BaseService;