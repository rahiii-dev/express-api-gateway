import express,{Application} from 'express'
import controller from './controller'
import { authenticate, isAdmin } from '../../middleware/auth.middleware';

const orderRoutes:Application = express()

orderRoutes.get('/order/list', authenticate, isAdmin, controller.listOrders);
orderRoutes.get('/order/user', authenticate, controller.getOrdersByUser);

orderRoutes.get('/order/:id', authenticate, controller.getOrder);
orderRoutes.put('/order/:id', authenticate, isAdmin, controller.updateOrderStatus);

orderRoutes.post('/order', authenticate, controller.createOrder);


export default orderRoutes