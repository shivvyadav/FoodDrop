import mongoose from 'mongoose';

export interface IDeliveryAssignment {
  _id?: mongoose.Types.ObjectId;
  orderId: mongoose.Types.ObjectId;
  broadcastTo: mongoose.Types.ObjectId[];
  assignedTo: mongoose.Types.ObjectId | null;
  acceptedAt?: Date | null;
  status: 'broadcasted' | 'accepted' | 'completed';
  createdAt?: Date;
  updatedAt?: Date;
}

const deliveryAssignmentSchema = new mongoose.Schema<IDeliveryAssignment>(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    broadcastTo: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    acceptedAt: { type: Date, default: null },
    status: {
      type: String,
      enum: ['broadcasted', 'accepted', 'completed'],
      default: 'broadcasted',
    },
  },
  { timestamps: true },
);

const DeliveryAssignment =
  mongoose.models.DeliveryAssignment ||
  mongoose.model<IDeliveryAssignment>(
    'DeliveryAssignment',
    deliveryAssignmentSchema,
  );

export default DeliveryAssignment;
