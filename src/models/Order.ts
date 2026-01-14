import mongoose from 'mongoose';

export interface IOrder {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  items: [
    {
      foodId: mongoose.Types.ObjectId;
      quantity: number;
      price: number;
    },
  ];
  totalAmount: number;
  paymentMethod: 'stripe' | 'cod';
  isPaid: boolean;
  address: {
    fullName: string;
    contact: number;
    fullAddress: string;
    city: string;
    state: string;
    pincode?: string;
    latitude: number;
    longitude: number;
  };
  status: 'pending' | 'out for delivery' | 'delivered';
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Food',
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['stripe', 'cod'],
      required: true,
    },
    isPaid: { type: Boolean, default: false },
    address: {
      fullName: { type: String, required: true },
      contact: { type: Number, required: true },
      fullAddress: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: false, default: '' },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    status: {
      type: String,
      enum: ['pending', 'out for delivery', 'delivered'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

const Order =
  mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);
export default Order;
