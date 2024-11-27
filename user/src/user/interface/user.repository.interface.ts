import { Repository } from "../../core/repository";
import { IUser } from "../user.model";

interface IUserRepository extends Repository<IUser> {

}

export default IUserRepository