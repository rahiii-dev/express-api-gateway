import { Document, model, ObjectId, Schema } from "mongoose";

export interface IProduct extends Document {
    _id: string | ObjectId;
    name: string;
    description?: string;
    price: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema: Schema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true, 
    }
);

export default model<IProduct>('Product', productSchema, 'products');