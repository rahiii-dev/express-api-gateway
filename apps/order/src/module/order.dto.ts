import { IOrderItem } from "./order.model";

export interface CreateOrderDto {
    userId: string;
    items: IOrderItem[];
}

