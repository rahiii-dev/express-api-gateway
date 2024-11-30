import { protoLoader } from '@app/common';
import { logger } from "@app/core";
import * as grpc from '@grpc/grpc-js';
import ProductController from './module/product.controller';
import ProductService from './module/product.service';
import ProductRespository from './module/product.repository';



export const registerServices = (server: grpc.Server) => {
    const proto = protoLoader('product.proto');
    const productController = new ProductController(new ProductService(new ProductRespository()))
    
    const productImplementations = productController.getProcedures()

    const services = [
        {   
            name: "Product Service",
            serviceDefinition: proto.productPackage.ProductService.service,
            implementation: productImplementations,
        },
    ];

    services.forEach(({ name, serviceDefinition, implementation }) => {
        server.addService(serviceDefinition, implementation);
        logger.info(`Service registered: ${name}`);
    });
};
