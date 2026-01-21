import connectDB from '@/lib/db';
import Message from '@/models/Message';
import Order from '@/models/Order';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { roomId, text, senderId, time } = await req.json();

    if (!roomId || !text || !senderId) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 },
      );
    }

    const room = await Order.findById(roomId);

    if (!room) {
      return NextResponse.json(
        { success: false, message: 'Chat room not found' },
        { status: 404 },
      );
    }

    const message = await Message.create({
      roomId,
      text,
      senderId,
      time,
    });
    return NextResponse.json({ success: true, message }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `error saving message: ${error}` },
      { status: 500 },
    );
  }
}
