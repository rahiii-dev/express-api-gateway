export interface UserResponseDto{
    name: string;
    email: string;
    isAdmin: boolean
}

export interface UserCreateDto {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}
export interface UserLoginDto {
    email: string;
    password: string;
}
export interface UserLoginResponseDto {
    token: string,
    user: UserResponseDto
}
  