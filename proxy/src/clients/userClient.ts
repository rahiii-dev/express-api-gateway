import * as grpc from "@grpc/grpc-js";
import { loadProto } from "../utils/protoLoader";
import environment from '../config/environment';

const userProto = loadProto('user.proto');

const userServiceClient = new userProto.userPackage.userService(
  `localhost:${environment.USER_SERVICE_PORT}`, 
  grpc.credentials.createInsecure()
);

export default userServiceClient;
