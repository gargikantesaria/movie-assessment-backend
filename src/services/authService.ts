import { getCustomRepository } from "typeorm";
import TokenPayload from "../controllers/auth/tokenPayload";
import BaseService from "./baseService";
import * as Errors from "../errors";
import { ResponseMessages } from "../config/response_messages";
import { User } from "../entity/users";
import { Jwt } from "../helpers/jwt";
import { Aws } from "../helpers/aws";
import UserRepository from "../repositories/usersRepository";

export class AuthService extends BaseService {

    private userRepository: UserRepository;
    private aws = new Aws();

    constructor(tokenInfo: TokenPayload) {
        super(tokenInfo);
        this.userRepository = getCustomRepository(UserRepository);
    }

    // login user & create token
    public loginUserAndCreateToken = async (email: string, password: string) => {
        const user = await this.userRepository.getUserByEmail(email);

        // check user exist
        if (!user) {
            throw new Errors.NotFoundError(ResponseMessages.common.ERR_LOGIN_FAILED);
        }

        // check password is valid
        const passwordIsValid = await this.userRepository.checkPassword(password, user.password)
        if (!passwordIsValid) {
            throw new Errors.NotFoundError(ResponseMessages.common.ERR_LOGIN_FAILED);
        }

        delete user.password;

        return this.createToken(user);
    }

    // create token
    private async createToken(user: User) {
        const data: any = user;

        // create jwt auth token
        const createdJwtToken = await this.createJwtToken(user.user_uuid);
        delete user.password;

        return {
            access_token: createdJwtToken,
            data: data
        }
    }

    // create JWT token
    private createJwtToken = async (user_uuid: string) => {
        const jwtTokenObj = new TokenPayload(user_uuid);

        return Jwt.getAuthToken(jwtTokenObj);
    }
}