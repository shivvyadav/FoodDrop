import connectDB from '@/lib/db';
import Order from '@/models/Order';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { order_id: string } },
) {
  try {
    await connectDB();
    const { order_id } = await params;
    const { status } = await req.json();

    const order = await Order.findById(order_id).populate('userId');

    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 },
      );
    }
    order.status = status;
    await order.save();

    let availableDeliveryBoys: any = [];
    if (status === 'out for delivery' && !order.assignment) {
      availableDeliveryBoys = await Order.find({ status: 'out for delivery' });
    }
    return NextResponse.json(
      { success: true, order, availableDeliveryBoys },
      { status: 200 },
    );
  } catch (error) {}
}
