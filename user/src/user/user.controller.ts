import IUserSevice from './interface/user.service.interfae';
import UserService from './user.service';
import grpcWrapper from '../core/grpcWrapper';


class UserController {
  private userSevice:IUserSevice;

  constructor() {
    this.userSevice = new UserService();  
  }

  public getProcedures(){
    return {
      GetUsers: this.getUsers.bind(this),
    }
  }

  private getUsers = grpcWrapper(async (call: any, callback: any) => {
    const users = await this.userSevice.getAll();
    callback(null, { users })
  })
}

export default UserController