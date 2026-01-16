import connectDB from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import Order from '@/models/Order';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const session = await auth();
    if (!session || !session?.user || session?.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized access' },
        { status: 401 },
      );
    }

    const orders = await Order.find({})
      .populate({
        path: 'userId',
        select: '_id username email contact image',
      })
      .populate({
        path: 'items.foodId',
        select: '_id name image price category type',
      })
      .sort({ createdAt: -1 })
      .lean();
    if (!orders) {
      return NextResponse.json(
        { success: false, message: 'No orders found' },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
