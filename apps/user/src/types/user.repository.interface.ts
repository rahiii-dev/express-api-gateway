import { Repository } from "@app/core";
import { IUser } from "../module/user.model";
import { UserCreateDto, UserResponseDto } from "../module/user.dto";

interface IUserRepository extends Repository<IUser> {
    createAndTransform(data: UserCreateDto): Promise<UserResponseDto>
}

export default IUserRepository