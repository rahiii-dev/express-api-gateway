import { Repository } from "@app/core";
import { IOrder } from "./order.model";
import { IOrderRepository } from "../types/order.repository.interface";

class ProductRespository extends Repository<IOrder> implements IOrderRepository {
    constructor() {
        super('orders')
    }
}

export default ProductRespository