import connectDB from '@/lib/db';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { userId, lat, long } = await req.json();

    if (!userId || lat === undefined || long === undefined) {
      return NextResponse.json(
        { success: false, message: 'missing userId or lat or long' },
        { status: 400 },
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 },
      );
    }
    user.location = {
      type: 'Point',
      coordinates: [long, lat],
    };
    await user.save();
    return NextResponse.json({
      success: true,
      message: 'Location updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
