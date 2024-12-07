import * as grpc from "@grpc/grpc-js";
import { protoLoader } from "@app/common";

const order = protoLoader('order.proto');

const orderServiceAddress = process.env.ORDER_SERVICE_URL || `localhost:5003`;

const orderServiceClient = new order.orderPackage.OrderService(
  orderServiceAddress, 
  grpc.credentials.createInsecure()
);

export default orderServiceClient;