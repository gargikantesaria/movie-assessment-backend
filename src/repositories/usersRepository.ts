import { AbstractRepository, EntityRepository } from "typeorm";
import * as bcrypt from "bcrypt";
import { User } from "../entity/users";

@EntityRepository(User)
class UserRepository extends AbstractRepository<User> {

    public getUserByEmail = async (email: string) => {
        return await this.repository.findOne({ where: { email: email } });
    }

    public getUserById = async (user_uuid: string) => {
        return await this.repository.findOne({ where: { user_uuid: user_uuid } });
    }

    public checkPassword = async (password: string, hash: string) => {
        if (hash) {
            return await bcrypt.compare(password, hash.toString());
        }
        return false;
    }
}

export default UserRepository;