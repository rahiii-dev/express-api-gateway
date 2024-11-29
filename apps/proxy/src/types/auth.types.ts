import { CustomPayload } from "../utils/jwt";
import { Request } from "express";

export interface AuthRequest extends Request {
   user: CustomPayload 
}