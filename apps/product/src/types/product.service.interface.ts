import { CreateProductDTO, UpdateProductDTO } from "../module/product.dto";
import { IProduct } from "../module/product.model";

export interface IProductService {
  /**
   * Retrieves all products.
   * @param filters Optional filters to apply.
   * @returns A promise resolving to an array of products.
   */
  getAllProducts(filters?: Partial<IProduct>): Promise<IProduct[]>;

  /**
   * Retrieves a product by its ID.
   * @param id The product ID.
   * @returns A promise resolving to the product, or null if not found.
   */
  getProductById(id: string): Promise<IProduct | null>;

  /**
   * Creates a new product.
   * @param productData The data for the new product.
   * @returns A promise resolving to the created product.
   */
  createProduct(productData: CreateProductDTO): Promise<IProduct>;

  /**
   * Updates an existing product by its ID.
   * @param id The product ID.
   * @param productData The updated product data.
   * @returns A promise resolving to the updated product, or null if not found.
   */
  updateProduct(id: string, productData: UpdateProductDTO): Promise<IProduct | null>;

  /**
   * Deletes a product by its ID.
   * @param id The product ID.
   * @returns A promise resolving status of delete.
   */
  deleteProduct(id: string): Promise<string>;
}
