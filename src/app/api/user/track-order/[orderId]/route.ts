import { auth } from '@/auth';
import connectDB from '@/lib/db';
import Order from '@/models/Order';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { orderId: string } },
) {
  try {
    await connectDB();
    const { orderId } = await params;

    // check if user is authenticated
    const session = await auth();
    if (!session || !session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized access' },
        { status: 401 },
      );
    }

    // check if order exists
    const order = await Order.findById(orderId)
      .populate('assignedDeliveryBoy')
      .lean();
    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, order }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Track order error from server: ${error}` },
      { status: 500 },
    );
  }
}
