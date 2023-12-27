class TokenPayload {

    constructor(user_uuid: string) {
        this.user_uuid = user_uuid;
    }

    public user_uuid: string;
}

export default TokenPayload;