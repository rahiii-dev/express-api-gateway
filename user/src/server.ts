import server from ".";
import * as grpc from '@grpc/grpc-js';

const PORT = process.env.PORT || 5001;

server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (error, port) => {
    if(error){
        console.error('Error starting user server:', error);
        process.exit(1);
    }
    console.log(`User gRPC service running at 0.0.0.0:${port}`);
});