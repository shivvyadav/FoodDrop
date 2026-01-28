import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Food from '@/models/Food';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const foods = await Food.find({}).lean();
    if (!foods) {
      return NextResponse.json(
        { success: false, message: 'No foods found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, foods }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Internal server error ${error}` },
      { status: 500 },
    );
  }
}
