import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Food from '@/models/Food';
import { auth } from '@/auth';
import uploadOnCloudinary from '@/lib/cloudinary';

export async function PATCH(
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

    const food = await Food.findById(id);
    if (!food) {
      return NextResponse.json(
        { success: false, message: 'Food not found' },
        { status: 404 },
      );
    }

    const formData = await req.formData();

    const name = formData.get('name') as string | null;
    const price = Number(formData.get('price'));
    const category = formData.get('category') as string | null;
    const type = formData.get('type') as string | null;
    const image = formData.get('image') as File | null;

    if (name) {
      food.name = name;
    }

    if (price) {
      food.price = price;
    }

    if (category) {
      food.category = category;
    }

    if (type) {
      food.type = type;
    }

    if (image) {
      const imageUrl = await uploadOnCloudinary(image);
      food.image = imageUrl;
    }

    await food.save({ validateBeforeSave: false });
    return NextResponse.json({ success: true, message: 'Food updated', food });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Internal Server Error ${error}` },
      { status: 500 },
    );
  }
}
