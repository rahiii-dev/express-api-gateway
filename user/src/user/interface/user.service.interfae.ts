import { IUser } from "../user.model"

interface IUserSevice {
    getAll(): Promise<IUser[]>
}

export default IUserSevice
