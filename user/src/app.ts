import * as grpc from '@grpc/grpc-js';

export const createGrpc = () => {
    const server = new grpc.Server();

    return server
}