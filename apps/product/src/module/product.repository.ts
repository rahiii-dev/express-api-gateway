import { Repository } from "@app/core";
import { IProductRepository } from "../types/product.repository.interface";
import { IProduct } from "./product.model";

class ProductRespository extends Repository<IProduct> implements IProductRepository {
    constructor() {
        super('products')
    }
}

export default ProductRespository