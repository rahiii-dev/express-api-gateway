import { BadRequestError } from "@app/common";
import IUserRepository from "../interface/user.repository.interface";
import { UserCreateDto, UserLoginDto, UserLoginResponseDto, UserResponseDto } from "./user.dto";
import bcrypt from 'bcryptjs';

class UserService {
    private userRepository: IUserRepository

    constructor(repository: IUserRepository) {
        this.userRepository = repository;
    }

    public async getAll(): Promise<UserResponseDto[]> {
        const users = this.userRepository.find({})
        return users;
    }

    public async findUserByEmail(email: string){
        return await this.userRepository.findOne({ email });
    }

    public async register(data: UserCreateDto): Promise<UserResponseDto> {
        const { name, email, password } = data;

        if (await this.findUserByEmail(email)) {
            throw new BadRequestError("User alreay exist");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await this.userRepository.createAndTransform({name, email, password: hashedPassword, isAdmin: false});
        return result
    }


    public async login({ email, password }: UserLoginDto): Promise<UserResponseDto> {
        const user = await this.findUserByEmail(email);
        
        if (!user) {
            throw new BadRequestError("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new BadRequestError("Invalid credentials");
        }

        const { password: _, ...userResponse } = user;
        return userResponse;
    }

    public async getProfile(id: string): Promise<UserResponseDto> {
        const user = await this.userRepository.findOneById(id)

        if (!user) {
            throw new BadRequestError("User not found");
        }

        const { password: _, ...userResponse } = user;
        return userResponse;
    }
}


export default UserService;