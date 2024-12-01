import * as grpc from "@grpc/grpc-js";
import { protoLoader } from "@app/common";

const userProto = protoLoader('user.proto');

const userServiceAddress = process.env.USER_SERVICE_URL || `localhost:5001`;

const userServiceClient = new userProto.userPackage.userService(
  userServiceAddress, 
  grpc.credentials.createInsecure()
);

export default userServiceClient;