import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import uploadOnCloudinary from '@/lib/cloudinary';
import { auth } from '@/auth';

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 },
      );
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 },
      );
    }

    const formData = await req.formData();

    const username = formData.get('username') as string | null;
    const contact = formData.get('contact') as string | null;
    const image = formData.get('image') as File | null;

    const oldPassword = formData.get('oldPassword') as string | null;
    const newPassword = formData.get('newPassword') as string | null;

    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) {
        return NextResponse.json(
          { success: false, message: 'Old password is incorrect' },
          { status: 400 },
        );
      }

      if (newPassword.length < 6) {
        return NextResponse.json(
          {
            success: false,
            message: 'Password must be at least 6 characters',
          },
          { status: 400 },
        );
      }

      user.password = await bcrypt.hash(newPassword, 10);
    }

    if (image) {
      const uploadedImageUrl = await uploadOnCloudinary(image);

      if (!uploadedImageUrl) {
        return NextResponse.json(
          { success: false, message: 'Image upload failed' },
          { status: 500 },
        );
      }

      user.image = uploadedImageUrl;
    }

    if (username) {
      user.username = username;
    }

    if (contact) {
      const contactNumber = Number(contact);
      if (Number.isNaN(contactNumber)) {
        return NextResponse.json(
          { success: false, message: 'Invalid contact number' },
          { status: 400 },
        );
      }
      user.contact = contactNumber;
    }

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Profile updated successfully',
        user,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('UPDATE PROFILE ERROR:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}
