import { productClient } from "@app/clients";
import { mapGrpcErrorToHttpStatus } from "@app/common";
import { ServiceError } from "@grpc/grpc-js";
import { Request, Response } from "express";

export default {
    listAll: (req: Request, res: Response) => {
        productClient.GetAllProducts({}, (error: ServiceError | null, response: any) => {
            if (error) {
                const status = mapGrpcErrorToHttpStatus(error);
                const message = error.details;
                return res.status(status).json({ message });
            }
            return res.json(response);
        });
    },

    getProductById: (req: Request, res: Response) => {
        const { id } = req.params;

        productClient.GetProductById({ id }, (error: ServiceError | null, response: any) => {
            if (error) {
                const status = mapGrpcErrorToHttpStatus(error);
                const message = error.details;
                return res.status(status).json({ message });
            }
            return res.json(response);
        });
    },

    createProduct: (req: Request, res: Response) => {
        const productData = req.body;

        productClient.CreateProduct(productData, (error: ServiceError | null, response: any) => {
            if (error) {
                const status = mapGrpcErrorToHttpStatus(error);
                const message = error.details;
                return res.status(status).json({ message });
            }
            return res.status(201).json(response);
        });
    },

    updateProduct: (req: Request, res: Response) => {
        const { id } = req.params;
        const productData = req.body;

        productClient.UpdateProduct({ id, productData }, (error: ServiceError | null, response: any) => {
            if (error) {
                const status = mapGrpcErrorToHttpStatus(error);
                const message = error.details;
                return res.status(status).json({ message });
            }
            return res.json(response);
        });
    },

    deleteProduct: (req: Request, res: Response) => {
        const { id } = req.params;

        productClient.DeleteProduct({ id }, (error: ServiceError | null, response: any) => {
            if (error) {
                const status = mapGrpcErrorToHttpStatus(error);
                const message = error.details;
                return res.status(status).json({ message });
            }
            return res.json(response);
        });
    },
};
