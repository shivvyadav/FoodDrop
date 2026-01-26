import connectDB from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import uploadOnCloudinary from '@/lib/cloudinary';
import Food from '@/models/Food';

type Food = {
  name: string;
  image: File | null;
  price: number;
  category: string;
  quantity: number;
};
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const session = await auth();
    if (session?.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized access' },
        { status: 401 },
      );
    }

    const formData = await req.formData();

    const name = formData.get('name') as string;
    const price = Number(formData.get('price'));
    const category = formData.get('category') as string;
    const type = formData.get('type') as string;
    const image = formData.get('image') as File | null;

    if (!name || !image || !price || !category) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 },
      );
    }

    const imageUrl = await uploadOnCloudinary(image);

    const newFood = await Food.create({
      name,
      image: imageUrl,
      price,
      category,
      type,
    });

    return NextResponse.json({
      success: true,
      message: 'Food added successfully',
      newFood,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: 'Error adding food' },
      { status: 500 },
    );
  }
}
