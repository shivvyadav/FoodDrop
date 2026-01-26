import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Food from '@/models/Food';
import { auth } from '@/auth';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();
    const { id } = await params;
    const session = await auth();
    if (session?.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized access' },
        { status: 401 },
      );
    }

    await Food.findByIdAndDelete(id);
    return NextResponse.json(
      { success: true, message: 'Food deleted' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Internal Server Error ${error}` },
      { status: 500 },
    );
  }
}
