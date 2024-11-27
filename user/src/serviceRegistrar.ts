import { loadProto } from './common/protoLoader';
import UserController from './user/user.controller';
import logger from './core/logger';
import * as grpc from '@grpc/grpc-js';

export const registerServices = (server: grpc.Server) => {
    const proto = loadProto('user.proto');

    const userImplementations = new UserController().getProcedures()

    const services = [
        {   
            name: "User Service",
            serviceDefinition: proto.userPackage.userService.service,
            implementation: userImplementations,
        },
    ];

    services.forEach(({ name, serviceDefinition, implementation }) => {
        server.addService(serviceDefinition, implementation);
        logger.info(`Service registered: ${name}`);
    });
};
