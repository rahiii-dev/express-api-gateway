import { ServiceError } from "@grpc/grpc-js";
import {userClient} from '@app/clients';
import { Response, Request } from "express";
import { mapGrpcErrorToHttpStatus } from "@app/common";
import { generateAccessToken } from "../../utils/jwt";
import { AuthRequest } from "../../types/auth.types";

export default {
    login : (req: Request, res: Response) => {
        const {email, password} = req.body;

        userClient.Login({email, password}, (error: ServiceError | null, response: any) => {
            if (error) {
                const status = mapGrpcErrorToHttpStatus(error);
                const message = error.details;  
                return res.status(status).json({message})
              }
              
              const token = generateAccessToken(response)
              return res.json({token, ...response})
        })
    },
    register : (req: Request, res: Response) => {
        const {name, email, password} = req.body;

        userClient.Register({name, email, password}, (error: ServiceError | null, response: any) => {
            if (error) {
                const status = mapGrpcErrorToHttpStatus(error);
                const message = error.details;  
                return res.status(status).json({message})
              }
              
              return res.status(201).json(response)
        })
    },

    profile: (req: Request, res: Response) => {
        const user = (req as AuthRequest).user;

        userClient.GetProfile({userid: user._id}, (error: ServiceError | null, response: any) => {
            if (error) {
                const status = mapGrpcErrorToHttpStatus(error);
                const message = error.details;  
                return res.status(status).json({message})
              }
              
              return res.status(200).json(response)
    })
    }

}