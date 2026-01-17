import connectDB from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const reqBody = await request.json();
    const { token } = reqBody;

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }
    console.log(user);

    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save({ validateBeforeSave: false });

    return NextResponse.json({
      message: 'Email verified successfully',
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 },
    );
  }
}
