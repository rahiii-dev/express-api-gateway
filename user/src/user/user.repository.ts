import { Repository } from "../core/repository";
import IUserRepository from "./interface/user.repository.interface";
import { IUser } from "./user.model";

class UserRepository extends Repository<IUser> implements IUserRepository {
    constructor() {
        super('users');
    }
}

export default UserRepository