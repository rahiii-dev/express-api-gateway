import { protoLoader } from '@app/common';
import { logger } from "@app/core";
import * as grpc from '@grpc/grpc-js';
import UserController from './module/user.controller';
import UserService from './module/user.service';
import UserRepository from './module/user.repository';


export const registerServices = (server: grpc.Server) => {
    const proto = protoLoader('user.proto');
    const userController = new UserController(new UserService(new UserRepository))
    
    const userImplementations = userController.getProcedures()

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
