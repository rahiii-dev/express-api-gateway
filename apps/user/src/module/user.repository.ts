import { Repository } from "@app/core";
import { IUser } from "./user.model";
import IUserRepository from "../interface/user.repository.interface";
import { UserResponseDto } from "./user.dto";
import { InternalError } from "@app/common";

class UserRepository extends Repository<IUser> implements IUserRepository {
    constructor() {
        super('users');
    }

    public async createAndTransform(document: IUser): Promise<UserResponseDto> {
        const result = await this.create(document);
        const createdUser = await this.findOneById(result.insertedId.toString());
    
        if (!createdUser) {
            throw new InternalError("User not found after creation");
        }
        const { password, ...userResponse } = createdUser; 
        return userResponse;
    }
    
}

export default UserRepository