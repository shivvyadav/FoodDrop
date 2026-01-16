import connectDB from '@/lib/db';
import Order from '@/models/Order';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { userId, items, totalAmount, paymentMethod, address } =
      await req.json();
    if (!userId || !items || !totalAmount || !paymentMethod || !address) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 },
      );
    }
    const userExist = await User.findById(userId);
    if (!userExist) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 400 },
      );
    }
    const newOrder = await Order.create({
      userId,
      items,
      totalAmount,
      paymentMethod,
      address,
    });
    return NextResponse.json(
      { success: true, message: 'Order created successfully', order: newOrder },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to create order' },
      { status: 500 },
    );
  }
}
