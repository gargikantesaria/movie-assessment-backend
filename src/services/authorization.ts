import TokenPayload from "../controllers/auth/tokenPayload";

class Authorization {
    private tokenInfo: TokenPayload;

    constructor(tokenInfo: TokenPayload) {
        if (!tokenInfo) {
            this.tokenInfo = new TokenPayload("");
        } else {
            this.tokenInfo = tokenInfo;
        }
    }

    public userShouldBe = (user_uuid: string) => {
        return this.tokenInfo.user_uuid === user_uuid;
    }

}

export default Authorization;