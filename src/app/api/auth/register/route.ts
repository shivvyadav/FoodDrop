import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { username, email, password, role, contact } = await request.json();

    if (!username || !email || !password || !role || !contact) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters' },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { success: false, message: 'User already exists' },
        { status: 400 },
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      contact: Number(contact),
    });

    return NextResponse.json(
      { success: true, message: 'User registered successfully', newUser },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: 'error occured during registering user' },
      { status: 500 },
    );
  }
}
