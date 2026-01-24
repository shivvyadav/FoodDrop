export const runtime = 'nodejs';

import connectDB from '@/lib/db';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailer';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'missing userId' },
        { status: 400 },
      );
    }

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'user not found' },
        { status: 404 },
      );
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    user.verifyCode = otp;
    user.verifyCodeExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    await sendEmail({
      toEmail: user.email,
      subject: 'Your FoodDrop verification code',
      code: otp,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `error sending otp:${error}` },
      { status: 500 },
    );
  }
}
