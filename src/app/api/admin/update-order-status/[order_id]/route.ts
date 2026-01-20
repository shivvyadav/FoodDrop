import connectDB from '@/lib/db';
import emitEventHandler from '@/lib/emitEventHandler';
import DeliveryAssignment from '@/models/DeliveryAssignment';
import Order from '@/models/Order';
import User, { IUser } from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(
  req: NextRequest,
  { params }: { params: { order_id: string } },
) {
  try {
    await connectDB();

    const { order_id } = await params;
    const { status } = await req.json();

    // check if order exists
    const order = await Order.findById(order_id).populate('userId');
    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 },
      );
    }
    order.status = status;
    await order.save();

    let availableDeliveryBoysData: any = [];

    // check if order is out for delivery and delivery boy is not assigned
    if (status === 'out for delivery' && !order.assignment) {
      const { latitude, longitude } = order.address;

      // check if delivery boy is available
      const nearByDeliveryBoys = await User.find({
        role: 'delivery',
        // isOnline: true,
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [Number(longitude), Number(latitude)],
            },
            $maxDistance: 10000,
          },
        },
      });

      // check if delivery boy is busy
      const busyIds = await DeliveryAssignment.find({
        assignedTo: { $in: nearByDeliveryBoys.map((b) => b._id) },
        status: { $nin: ['completed', 'broadcasted'] },
      }).distinct('assignedTo');

      const busySet = new Set(busyIds.map(String));
      // filter out busy delivery boys
      const available = nearByDeliveryBoys.filter(
        (b) => !busySet.has(String(b._id)),
      );
      // if no delivery boy is available
      if (!available.length) {
        await emitEventHandler('orderStatusUpdated', {
          orderId: order._id,
          status: order.status,
        });
        return NextResponse.json(
          { success: true, message: 'No delivery boy available' },
          { status: 200 },
        );
      }
      // create assignment
      const assignment = await DeliveryAssignment.create({
        orderId: order._id,
        broadcastTo: available.map((b) => b._id),
        status: 'broadcasted',
      });

      await assignment.populate('orderId');

      // notify delivery boys
      for (const deliveryBoy of available) {
        const boy = await User.findById(deliveryBoy._id);
        if (boy.socketId) {
          await emitEventHandler('newAssignment', assignment, boy.socketId);
        }
      }

      order.assignment = assignment._id;

      // get available delivery boys
      availableDeliveryBoysData = available.map((b) => ({
        name: b.username,
        contact: b.contact,
        image: b.image,
        latitude: b.location.coordinates[1],
        longitude: b.location.coordinates[0],
      }));
    }

    await order.save();
    await order.populate('userId');

    // emit event
    await emitEventHandler('orderStatusUpdated', {
      orderId: order._id,
      status: order.status,
    });

    return NextResponse.json({
      success: true,
      message: 'Order status updated successfully',
      order,
      availableDeliveryBoysData,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
