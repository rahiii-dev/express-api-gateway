import { ServiceError } from "@grpc/grpc-js";

export function mapGrpcErrorToHttpStatus(error: ServiceError): number {
    switch (error.code) {
      case 3: // INVALID_ARGUMENT
        return 400;
      case 5: // NOT_FOUND
        return 404;
      case 7: // PERMISSION_DENIED
      case 16: // UNAUTHENTICATED
        return 401;
      case 13: // INTERNAL
        return 500;
      default:
        return 500;
    }
}

