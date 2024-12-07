import * as grpc from '@grpc/grpc-js';
import {logger, database} from '@app/core';
import { registerServices } from './serviceRegistrar';

class Server {
    public app: grpc.Server;

    constructor() {
        this.app = new grpc.Server();
        this.initialize()
    }

    async initialize() {
        await database.connect();
        registerServices(this.app)
        process.on('SIGINT', this.shutdown.bind(this));
        process.on('SIGTERM', this.shutdown.bind(this));
    }

    start(PORT:string) {
        this.app.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (error, port) => {
            if(error){
                logger.error(`Error starting order server: ${error}`);
                process.exit(1);
            }
            logger.info(`Order gRPC service running at 0.0.0.0:${port}`);
        });
    }

    private async shutdown() {
        logger.info('Shutting down gRPC server...');
        await database.disconnect();
        this.app.tryShutdown(err => {
            if (err) {
                logger.error('Error during shutdown:', err);
            }
            process.exit(0);
        });
    }
}


export default Server