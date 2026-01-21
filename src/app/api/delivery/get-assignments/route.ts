import { auth } from '@/auth';
import connectDB from '@/lib/db';
import DeliveryAssignment from '@/models/DeliveryAssignment';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const session = await auth();

    if (!session || !session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized access' },
        { status: 401 },
      );
    }

    const allAssignments = await DeliveryAssignment.find({
      broadcastTo: session.user.id,
      status: 'broadcasted',
    })
      .populate('orderId')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      { success: true, allAssignments },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Internal Server Error :${error}` },
      { status: 500 },
    );
  }
}
