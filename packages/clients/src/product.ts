import * as grpc from "@grpc/grpc-js";
import { protoLoader } from "@app/common";

const product = protoLoader('product.proto');

const productServiceAddress = process.env.PRODUCT_SERVICE_URL || `localhost:5002`;

const productServiceClient = new product.productPackage.ProductService(
  productServiceAddress, 
  grpc.credentials.createInsecure()
);

export default productServiceClient;