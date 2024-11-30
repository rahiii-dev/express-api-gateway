import * as grpc from "@grpc/grpc-js";
import { protoLoader } from "@app/common";

const product = protoLoader('product.proto');

const productServiceClient = new product.productPackage.ProductService(
  `localhost:${process.env.USER_SERVICE_PORT || 5002}`, 
  grpc.credentials.createInsecure()
);

export default productServiceClient;