import connectDB from '@/lib/db';
import Message from '@/models/Message';
import Order from '@/models/Order';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { roomId } = await req.json();

    const room = await Order.findById(roomId);

    if (!room) {
      return NextResponse.json(
        { success: false, message: 'Chat room not found' },
        { status: 404 },
      );
    }

    const messages = await Message.find({ roomId: room._id }).lean();
    return NextResponse.json({ success: true, messages }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `error getting messages: ${error}` },
      { status: 500 },
    );
  }
}
