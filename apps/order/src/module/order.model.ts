import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrderItem {
  product: string;
  name: string;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  user: string; 
  items: IOrderItem[]; 
  totalAmount: number;
  status: "Pending" | "Completed" | "Canceled"; 
  createdAt: Date; 
  updatedAt: Date;
}

const OrderItemSchema: Schema = new Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const OrderSchema: Schema = new Schema(
  {
    user: { type: String, required: true },
    items: { type: [OrderItemSchema], required: true },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Canceled"],
      default: "Pending",
    },
  },
  { timestamps: true } 
);

export const OrderModel: Model<IOrder> = mongoose.model<IOrder>("Order", OrderSchema);
