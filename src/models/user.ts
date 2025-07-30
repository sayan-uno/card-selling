// src/models/user.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  facebookId: string;
  name: string;
  email?: string;
  pictureUrl?: string;
  accessToken: string;
}

const userSchema = new Schema<IUser>({
  facebookId: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  email: { type: String, sparse: true }, // Not all users may share their email
  pictureUrl: { type: String },
  accessToken: { type: String, required: true },
}, { timestamps: true });

// Check if the model is already defined before defining it
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
