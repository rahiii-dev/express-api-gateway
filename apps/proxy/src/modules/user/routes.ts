import express,{Application} from 'express'
import controller from './controller'
import { authenticate } from '../../middleware/auth.middleware';

const userRoutes:Application = express()

userRoutes.post("/login", controller.login);
userRoutes.post("/register", controller.register);

userRoutes.get("/profile", authenticate, controller.profile);

export default userRoutes