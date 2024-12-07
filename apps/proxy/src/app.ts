import express, { Application } from 'express';
import { logger } from '@app/core';
import morgan from 'morgan';
import userRoutes from './modules/user/routes';
import productRoutes from './modules/product/routes';
import orderRoutes from './modules/order/routes';
import { notFoundHandler } from './middleware/appError.middleware';

class Server {
  public app: Application;
  private server: any;

  constructor() {
    this.app = express();
    this.initialize();
  }

  async initialize() {
    process.on('SIGINT', this.shutdown.bind(this)); 
    process.on('SIGTERM', this.shutdown.bind(this)); 

    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  initializeMiddlewares() {
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
  }

  initializeRoutes() {
    this.app.get('/', (req, res) => {
      res.json({message: 'API Gateway is up and running!'});
    });

    this.app.use('/api',userRoutes);
    this.app.use('/api',productRoutes);
    this.app.use('/api',orderRoutes);

    this.app.use(notFoundHandler);
  }

  start(PORT: string) {
    this.server = this.app.listen(PORT, () => {
      logger.info(`API Gateway running on PORT: ${PORT}`);
    });
  }

  private async shutdown() {
    logger.info('Shutting down API Gateway...');
    try {
      this.server?.close(() => {
        logger.info('API Gateway shut down gracefully.');
        process.exit(0); 
      });
    } catch (error) {
      logger.error('Error during shutdown:', error);
      process.exit(1);
    }
  }
}

export default Server;
