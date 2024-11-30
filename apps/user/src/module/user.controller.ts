import { grpcWrapper } from '@app/core';
import IUserSevice from '../types/user.service.interfae';

class UserController {
  private userSevice:IUserSevice;

  constructor(service:IUserSevice) {
    this.userSevice = service;  
  }

  public getProcedures(){
    return {
      Login: this.login.bind(this),
      Register: this.resgister.bind(this),
      GetProfile: this.getProfile.bind(this)
    }
  }

  private getProfile = grpcWrapper(async (call: any, callback: any) => {
    const profile = await this.userSevice.getProfile(call.request.userid);
    callback(null, profile)
  })

  private login = grpcWrapper(async (call: any, callback: any) => {
    const result = await this.userSevice.login(call.request);
    callback(null, result)
  })

  private resgister = grpcWrapper(async (call: any, callback: any) => {
    const result = await this.userSevice.register(call.request);
    callback(null, result)
  })
}

export default UserController