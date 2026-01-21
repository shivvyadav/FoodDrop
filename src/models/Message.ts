import mongoose from 'mongoose';

export interface IMessage {
  _id?: mongoose.Types.ObjectId;
  roomId: mongoose.Types.ObjectId | string;
  text: string;
  senderId: mongoose.Types.ObjectId | string;
  time: Date;
}

const messageSchema = new mongoose.Schema<IMessage>({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
    index: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

messageSchema.index({ roomId: 1, createdAt: -1 });

const Message =
  mongoose.models.Message || mongoose.model<IMessage>('Message', messageSchema);

export default Message;
