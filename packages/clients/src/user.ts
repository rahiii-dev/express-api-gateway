import * as grpc from "@grpc/grpc-js";
import { protoLoader } from "@app/common";

const userProto = protoLoader('user.proto');

const userServiceClient = new userProto.userPackage.userService(
  `localhost:${process.env.USER_SERVICE_PORT || 5001}`, 
  grpc.credentials.createInsecure()
);

export default userServiceClient;