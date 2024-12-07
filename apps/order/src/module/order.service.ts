import { BadRequestError, InvalidIdError, NotFoundError } from "@app/common";
import { IOrderRepository } from "../types/order.repository.interface";
import { IOrderService } from "../types/order.service.interface";
import { CreateOrderDto } from "./order.dto";
import { IOrder } from "./order.model";
import { isValidObjectId } from "mongoose";

class OrderService implements IOrderService {
    private repository: IOrderRepository;

    constructor(orderRepository: IOrderRepository) {
        this.repository = orderRepository
    }

    async listOrders(): Promise<IOrder[]> {
        return this.repository.find({});
    }

    async getOrderById(orderId: string): Promise<IOrder> {        
        if(!isValidObjectId(orderId)){
            throw new InvalidIdError("Invalid Order id")
        }
        const order = await this.repository.findOneById(orderId);

        if(!order){
            throw new NotFoundError("Requested order not found");
        } 

        return order;
    }

    async getOrdersByUser(userId: string): Promise<IOrder[]> {
        return await this.repository.find({user: userId})
    }

    async createOrder(data: CreateOrderDto): Promise<IOrder> {
        const {items, userId} = data;
        const totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const result = await this.repository.create({items, user: userId, totalAmount, status: "Pending"});
        const order = await this.repository.findOneById(result.insertedId.toString());
        if(!order){
            throw new BadRequestError("Failed to create order");
        }
        return order
    }

    async updateOrderStatus(orderId: string, status: IOrder["status"]): Promise<IOrder | null> {
        if(status != "Pending" && status != "Canceled" && status != "Completed"){
            throw new BadRequestError(`Invalid status: ${status}`);
        }

        const order = await this.repository.findOneById(orderId);
        if(!order) {
            throw new BadRequestError("Order not found");
        }

        await this.repository.update({ _id: order._id }, {$set: {status}});
        
        return {...order, status} 
    }
}

export default OrderService