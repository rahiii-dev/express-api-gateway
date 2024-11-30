import { grpcWrapper } from "@app/core";
import { IProductService } from "../types/product.service.interface"

class ProductController {
    private service: IProductService;

    constructor(productService: IProductService) {
        this.service = productService
    }

    public getProcedures() {
        return {
            GetAllProducts: this.getProducts.bind(this),
            GetProductById: this.getProductById.bind(this),
            CreateProduct: this.createProduct.bind(this),
            UpdateProduct: this.updateProduct.bind(this),
            DeleteProduct: this.deleteProduct.bind(this),
        };
    }

    private getProducts = grpcWrapper(async (call: any, callback: any) => {
        const products = await this.service.getAllProducts(call.request.filter);
        callback(null, { products });
    });

    private getProductById = grpcWrapper(async (call: any, callback: any) => {
        const product = await this.service.getProductById(call.request.id);
        callback(null, product);
    });

    private createProduct = grpcWrapper(async (call: any, callback: any) => {
        const productData = call.request;
        const product = await this.service.createProduct(productData);
        callback(null, product);
    });

    private updateProduct = grpcWrapper(async (call: any, callback: any) => {
        const { id, productData } = call.request;
        const updatedProduct = await this.service.updateProduct(id, productData);
        if (!updatedProduct) {
            callback({ code: 404, message: "Product Not Found" });
            return;
        }
        callback(null, updatedProduct);
    });

    private deleteProduct = grpcWrapper(async (call: any, callback: any) => {
        const { id }: { id: string } = call.request;
        const message = await this.service.deleteProduct(id);
        callback(null, { message });
    });
}

export default ProductController