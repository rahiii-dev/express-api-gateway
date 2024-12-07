import { orderClient, productClient } from "@app/clients";
import { mapGrpcErrorToHttpStatus } from "@app/common";
import { ServiceError } from "@grpc/grpc-js";
import { Request, Response } from "express";
import { AuthRequest } from "../../types/auth.types";
import { asyncWrapper } from "@app/core";

export default {
    // listAllOrders
    listOrders: (req: Request, res: Response) => {
        orderClient.ListAllOrders({}, (error: ServiceError | null, response: any) => {
            if (error) {
                const status = mapGrpcErrorToHttpStatus(error);
                const message = error.details || 'Unknown error occurred';
                return res.status(status).json({ message });
            }
            return res.json(response);
        });
    },

    // Get order by ID
    getOrder: (req: Request, res: Response) => {
        orderClient.GetOrderById({ orderId: req.params.id }, (error: ServiceError | null, response: any) => {
            if (error) {
                const status = mapGrpcErrorToHttpStatus(error);
                const message = error.details || 'Unknown error occurred';
                return res.status(status).json({ message });
            }
            return res.json(response);
        });
    },

    // Create order 
    createOrder : asyncWrapper (async (req: Request, res: Response) => {
        const { products } = req.body;
        const userId = (req as AuthRequest).user._id;
    
        if (!Array.isArray(products) || products.length === 0) {
            res.status(400).json({ message: "Products must be an array with at least one item." }).end();
        }
    
        try {
            const items = await Promise.all(
                products.map(async (product: { id: string; quantity: number }) => {
                    const { id, quantity } = product;
    
                    if (!id || !quantity) {
                        throw new Error("Product ID and quantity are required.");
                    }
    
                    const productResponse = await new Promise<any>((resolve, reject) => {
                        productClient.GetProductById({ id }, (error: ServiceError | null, response: any) => {
                            if (error) {
                                return reject(error); 
                            }

                            resolve({ product: response._id, name: response.name, price: response.price, quantity }); 
                        });
                    });
    
                    return productResponse;
                })
            );
    
            orderClient.CreateOrder({ userId, items }, (error: ServiceError | null, response: any) => {
                if (error) {
                    const status = mapGrpcErrorToHttpStatus(error);
                    const message = error.details || 'Unknown error occurred';
                    return res.status(status).json({ message }).end();
                }
                return res.json(response).end();
            });
        } catch (error) {
            res.status(500).json({ message: (error as Error).message || 'An error occurred while processing the order.' }).end();
        }
    }),

    // Update order status 
    updateOrderStatus: (req: Request, res: Response) => {
        const { status } = req.body;
        const orderId = req.params.id;

        orderClient.UpdateOrderStatus({ orderId, status }, (error: ServiceError | null, response: any) => {
            if (error) {
                const status = mapGrpcErrorToHttpStatus(error);
                const message = error.details || 'Unknown error occurred';
                return res.status(status).json({ message });
            }
            return res.json(response); 
        });
    },

    // Get all orders by user ID 
    getOrdersByUser: (req: Request, res: Response) => {
        const userId = (req as AuthRequest).user._id;
        orderClient.GetOrdersByUser({ userId }, (error: ServiceError | null, response: any) => {
            if (error) {
                const status = mapGrpcErrorToHttpStatus(error);
                const message = error.details || 'Unknown error occurred';
                return res.status(status).json({ message });
            }
            return res.json(response); 
        });
    }
};