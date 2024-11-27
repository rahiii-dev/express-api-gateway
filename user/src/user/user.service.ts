import IUserRepository from "./interface/user.repository.interface";
import { IUser } from "./user.model";
import UserRepository from "./user.repository";

class UserService {
    private userRepository: IUserRepository

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async getAll(): Promise<IUser[]> {
       const users = this.userRepository.find({})
       return users;
    }
}


export default UserService;