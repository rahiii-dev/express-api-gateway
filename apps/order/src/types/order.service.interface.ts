import { CreateOrderDto } from "../module/order.dto";
import { IOrder } from "../module/order.model";

export interface IOrderService {
  createOrder(data: CreateOrderDto): Promise<IOrder>;
  getOrderById(orderId: string): Promise<IOrder>;
  getOrdersByUser(userId: string): Promise<IOrder[]>;
  updateOrderStatus(orderId: string, status: IOrder["status"]): Promise<IOrder | null>;
  listOrders(): Promise<IOrder[]>;
}

