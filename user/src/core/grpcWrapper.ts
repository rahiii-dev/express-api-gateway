import * as grpc from '@grpc/grpc-js';
import logger from './logger';

function grpcWrapper(controller: Function) {
  return async (call: any, callback: any) => {
    try {
      await controller(call, callback); 
    } catch (error) {
      logger.error("gRPC Error: ", error);
      callback({
        code: grpc.status.INTERNAL,
        details: "An error occurred while processing the request.",
      }, null);
    }
  };
}

export default grpcWrapper