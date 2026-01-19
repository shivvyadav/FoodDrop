import mongoose, { Schema } from 'mongoose';

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password?: string;
  contact?: number;
  role: 'admin' | 'user' | 'delivery';
  image?: string;
  location?: {
    type: string;
    coordinates: number[];
  };
  socketId?: string | null;
  isOnline?: boolean;
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
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
    socketId: {
      type: String,
      default: null,
    },
    isOnline: {
      type: Boolean,
      default: false,
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

userSchema.index({ location: '2dsphere' });

const User = mongoose.models?.User || mongoose.model<IUser>('User', userSchema);
export default User;
