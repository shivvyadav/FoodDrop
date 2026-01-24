import { auth } from '@/auth';
import connectDB from '@/lib/db';
import Order from '@/models/Order';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const session = await auth();

    // check if user is authenticated
    if (!session || !session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized access' },
        { status: 401 },
      );
    }

    const deliveryBoyId = session.user.id;

    // check if assignment exists
    const activeAssignment = await Order.findOne({
      assignedDeliveryBoy: deliveryBoyId,
      status: 'out for delivery',
    }).lean();

    if (!activeAssignment) {
      return NextResponse.json(
        { success: false, message: 'No orders found' },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { success: true, activeAssignment },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Internal Server Error :${error}` },
      { status: 500 },
    );
  }
}
