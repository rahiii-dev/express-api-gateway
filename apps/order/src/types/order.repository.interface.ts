import { Repository } from "@app/core";
import { IOrder } from "../module/order.model";

export interface IOrderRepository extends Repository<IOrder> {
}