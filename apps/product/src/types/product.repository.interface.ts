import { Repository } from "@app/core";
import { IProduct } from "../module/product.model";

export interface IProductRepository extends Repository<IProduct> {
    // updateProduct()
}