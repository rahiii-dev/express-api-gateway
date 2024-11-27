import { createGrpc } from "./app";
import { UserController } from "./controllers/user.controller";
import { loadProto } from "./utils/protoLoader";

const proto = loadProto('user.proto');

const server = createGrpc()

server.addService(proto.userPackage.userService.service, UserController)

export default server