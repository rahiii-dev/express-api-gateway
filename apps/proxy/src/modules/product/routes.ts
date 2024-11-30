import express,{Application} from 'express'
import controller from './controller'
import { authenticate, isAdmin } from '../../middleware/auth.middleware';

const productRoutes:Application = express()

productRoutes.get("/products", controller.listAll);
productRoutes.get("/products/:id", controller.getProductById);

productRoutes.post("/products", authenticate, isAdmin, controller.createProduct);
productRoutes.put("/products/:id", authenticate, isAdmin, controller.updateProduct);
productRoutes.delete("/products/:id", authenticate, isAdmin, controller.deleteProduct);

export default productRoutes