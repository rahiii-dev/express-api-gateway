import mongoose, { Schema, ObjectId, Document } from 'mongoose';

export interface IUser extends Document {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false}
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>('User', UserSchema, 'users');

export default User;
