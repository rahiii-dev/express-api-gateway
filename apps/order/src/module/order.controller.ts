import { grpcWrapper } from "@app/core";
import { IOrderService } from "../types/order.service.interface";

class OrderController {
    private service: IOrderService;

    constructor(orderService: IOrderService) {
        this.service = orderService;
    }

    public getProcedures() {
        return {
            ListAllOrders: this.lisAllOrders.bind(this),
            GetOrderById: this.getOrderById.bind(this),
            CreateOrder: this.createOrder.bind(this),
            GetOrdersByUser: this.getOrdersByUser.bind(this),
            UpdateOrderStatus: this.updateOrderStatus.bind(this),
        };
    }

    private lisAllOrders = grpcWrapper(async (call: any, callback: any) => {
        const orders = await this.service.listOrders(); 
        callback(null, {orders}); 
    });

    private getOrderById = grpcWrapper(async (call: any, callback: any) => {
        const order = await this.service.getOrderById(call.request.orderId); 
        callback(null, order); 
    });

    private createOrder = grpcWrapper(async (call: any, callback: any) => {
        const { userId, items } = call.request;
        const response = await this.service.createOrder({ userId, items });
        callback(null, {orderId: response._id, message: "Order created successfully"}); 
    });

    private getOrdersByUser = grpcWrapper(async (call: any, callback: any) => {
        const orders = await this.service.getOrdersByUser(call.request.userId); 
        callback(null, { orders }); 
    });

    private updateOrderStatus = grpcWrapper(async (call: any, callback: any) => {
        const { orderId, status } = call.request; 
        const response = await this.service.updateOrderStatus(orderId, status);
        callback(null, {message: "Order updated succesfully", order: response});
    });
}

export default OrderController;
