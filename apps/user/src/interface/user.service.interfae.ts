import { UserCreateDto, UserLoginDto, UserLoginResponseDto, UserResponseDto } from "../module/user.dto"

interface IUserSevice {
    login(data: UserLoginDto): Promise<UserResponseDto>
    register(data: UserCreateDto): Promise<UserResponseDto>
    getProfile(id: string): Promise<UserResponseDto>
}

export default IUserSevice
