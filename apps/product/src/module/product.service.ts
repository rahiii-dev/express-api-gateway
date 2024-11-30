import { BadRequestError, InvalidIdError, NotFoundError } from "@app/common";
import { IProductRepository } from "../types/product.repository.interface";
import { IProductService } from "../types/product.service.interface";
import { CreateProductDTO, UpdateProductDTO } from "./product.dto";
import { IProduct } from "./product.model";

class ProductService implements IProductService {
    private repository: IProductRepository;

    constructor(productRepository: IProductRepository) {
        this.repository = productRepository
    }

    async getAllProducts(filters?: Partial<IProduct>): Promise<IProduct[]> {
        return await this.repository.find(filters ? {filters} : {});
    }

    async getProductById(id: string): Promise<IProduct> {
        
        if(!this.repository.isValidId(id)){
            throw new InvalidIdError();
        }
        
        const product = await this.repository.findOneById(id);
        if(!product){
            throw new NotFoundError("Product not found")
        }

        return product
    }

    async createProduct(productData: CreateProductDTO): Promise<IProduct> {
        const result = await this.repository.create(productData);
        const product = await this.repository.findOneById(result.insertedId.toString())
        if (!product) {
            throw new BadRequestError("Failed to create product");
        }
        return product;
    }

    async updateProduct(id: string, productData: UpdateProductDTO): Promise<IProduct | null> {
        const product = await this.repository.findOneById(id);
        if(!product) {
            throw new BadRequestError("Product not found");
        }

        await this.repository.update({ _id: product._id }, {$set: productData});
        
        return {...product, ...productData}
    }

    async deleteProduct(id: string): Promise<string> {
        const product = await this.repository.findOneById(id);
        if(!product) {
            throw new BadRequestError("Product not found");
        }

        const result = await this.repository.delete({ _id: product._id });
        return result ? "Product Deleted" : "Failed to Delete Product"
    }
}

export default ProductService