import mongoose, { Schema } from 'mongoose';

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password?: string;
  contact?: number;
  role: 'admin' | 'user' | 'delivery';
  image?: string;
  forgotPasswordToken?: String;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: String;
  verifyTokenExpiry?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    contact: {
      type: Number,
      required: false,
    },
    role: {
      type: String,
      enum: ['user', 'delivery', 'admin'],
      default: 'user',
    },
    image: {
      type: String,
      default: '',
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordTokenExpiry: {
      type: Date,
    },
    verifyToken: {
      type: String,
    },
    verifyTokenExpiry: {
      type: Date,
    },
  },
  { timestamps: true },
);

const User = mongoose.models?.User || mongoose.model<IUser>('User', userSchema);
export default User;
