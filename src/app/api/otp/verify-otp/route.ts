import { auth } from '@/auth';
import connectDB from '@/lib/db';
import emitEventHandler from '@/lib/emitEventHandler';
import DeliveryAssignment from '@/models/DeliveryAssignment';
import Order from '@/models/Order';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { userId, verifyCode, orderId } = await req.json();

    if (!userId || !verifyCode || !orderId) {
      return NextResponse.json(
        { success: false, message: 'missing userId or verifyCode' },
        { status: 400 },
      );
    }

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'user not found' },
        { status: 404 },
      );
    }

    if (user.verifyCode !== verifyCode) {
      return NextResponse.json(
        { success: false, message: 'invalid otp' },
        { status: 400 },
      );
    }

    if (user.verifyCodeExpiry < Date.now()) {
      return NextResponse.json(
        { success: false, message: 'otp expired' },
        { status: 400 },
      );
    }

    user.verifyCode = undefined;
    user.verifyCodeExpiry = undefined;
    await user.save();

    await Order.updateOne(
      { _id: orderId },
      { $set: { status: 'delivered', isPaid: true, deliveredAt: new Date() } },
    );

    await DeliveryAssignment.updateOne(
      { orderId: orderId },
      { $set: { status: 'completed' } },
    );

    await emitEventHandler('orderDelivered', {
      orderId: orderId,
      isPaid: true,
      status: 'delivered',
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `error verifying otp:${error}` },
      { status: 500 },
    );
  }
}
