import { protoLoader } from '@app/common';
import { logger } from "@app/core";
import * as grpc from '@grpc/grpc-js';
import OrderController from './module/order.controller';
import OrderService from './module/order.service';
import OrderRespository from './module/order.repository';



export const registerServices = (server: grpc.Server) => {
    const proto = protoLoader('order.proto');
    const orderController = new OrderController(new OrderService(new OrderRespository()))
    
    const orderImplementations = orderController.getProcedures()

    const services = [
        {   
            name: "Order Service",
            serviceDefinition: proto.orderPackage.OrderService.service,
            implementation: orderImplementations,
        },
    ];

    services.forEach(({ name, serviceDefinition, implementation }) => {
        server.addService(serviceDefinition, implementation);
        logger.info(`Service registered: ${name}`);
    });
};
