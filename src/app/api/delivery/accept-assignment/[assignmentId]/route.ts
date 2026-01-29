import { auth } from '@/auth';
import connectDB from '@/lib/db';
import emitEventHandler from '@/lib/emitEventHandler';
import DeliveryAssignment from '@/models/DeliveryAssignment';
import Order from '@/models/Order';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { assignmentId: string } },
) {
  try {
    await connectDB();
    const { assignmentId } = await params;
    const session = await auth();

    // check if user is authenticated
    if (!session || !session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized access' },
        { status: 401 },
      );
    }

    // check if assignment exists
    const assignment = await DeliveryAssignment.findOne({
      _id: assignmentId,
      status: 'broadcasted',
      broadcastTo: session.user.id,
    });

    if (!assignment) {
      return NextResponse.json(
        { success: false, message: 'Assignment not found' },
        { status: 404 },
      );
    }

    // check if delivery boy is already assigned
    const alreadyAssignedDeliveryBoy = await DeliveryAssignment.findOne({
      assignedTo: session.user.id,
      status: 'accepted',
    });

    if (alreadyAssignedDeliveryBoy) {
      return NextResponse.json(
        {
          success: false,
          message: 'You are already assigned to an order',
        },
        { status: 404 },
      );
    }

    // accept assignment
    assignment.assignedTo = session.user.id;
    assignment.status = 'accepted';
    assignment.acceptedAt = new Date();
    await assignment.save();

    // update order status
    const order = await Order.findById(assignment.orderId);
    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: 'Order not found',
        },
        { status: 404 },
      );
    }

    order.assignedDeliveryBoy = session.user.id;
    await order.save();

    const deliveryBoy = await User.findById(session.user.id).lean();
    if (!deliveryBoy) {
      return NextResponse.json(
        {
          success: false,
          message: 'Delivery boy not found',
        },
        { status: 404 },
      );
    }

    await emitEventHandler('orderAccepted', {
      orderId: order._id,
      assignedDeliveryBoy: {
        _id: deliveryBoy._id,
        username: deliveryBoy.username,
        contact: deliveryBoy.contact,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Order accepted successfully',
        order,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Internal Server Error',
      },
      { status: 500 },
    );
  }
}
