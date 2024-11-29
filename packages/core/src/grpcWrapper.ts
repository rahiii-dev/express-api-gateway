import * as grpc from '@grpc/grpc-js';
import logger from './logger';
import {
  ApplicationError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  InternalError,
  MissingFieldError,
  InvalidIdError,
} from '@app/common';

export function grpcWrapper(controller: Function) {
  return async (call: any, callback: any) => {
    try {
      await controller(call, callback);
    } catch (error) {
      if(process.env.NODE_ENV != "production"){
        logger.error("gRPC Error: ", error);
      }

      let message = "An error occurred while processing the request.";
      let code = grpc.status.INTERNAL;

      if (error instanceof ApplicationError) {
        message = error.message;
        code = mapErrorToGrpcStatus(error);
        logger.debug("App Error")
      }

      callback({ code, details: message }, null);
    }
  };
}

function mapErrorToGrpcStatus(error: ApplicationError): number {
  if (error instanceof BadRequestError || error instanceof MissingFieldError || error instanceof InvalidIdError) {
    return grpc.status.INVALID_ARGUMENT;
  }
  if (error instanceof UnauthorizedError) {
    return grpc.status.UNAUTHENTICATED;
  }
  if (error instanceof ForbiddenError) {
    return grpc.status.PERMISSION_DENIED;
  }
  if (error instanceof NotFoundError) {
    return grpc.status.NOT_FOUND;
  }
  if (error instanceof InternalError) {
    return grpc.status.INTERNAL;
  }

  return grpc.status.INTERNAL;
}
