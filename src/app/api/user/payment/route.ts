import connectDB from '@/lib/db';
import Order from '@/models/Order';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { userId, items, totalAmount, paymentMethod, address } =
      await req.json();
    if (
      !userId ||
      !items ||
      items.length === 0 ||
      !totalAmount ||
      !paymentMethod ||
      !address
    ) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 },
      );
    }
    const userExist = await User.findById(userId);
    if (!userExist) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 400 },
      );
    }
    const newOrder = await Order.create({
      userId,
      items,
      totalAmount,
      paymentMethod,
      address,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'npr',
          product_data: {
            name: 'Stripe_Payment',
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      metadata: { orderId: newOrder._id.toString() },
      mode: 'payment',
      success_url: `${process.env.NEXT_BASE_URL}/order-success`,
      cancel_url: `${process.env.NEXT_BASE_URL}/order-cancel`,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: `Internal Server Error: ${error}` },
      { status: 500 },
    );
  }
}
