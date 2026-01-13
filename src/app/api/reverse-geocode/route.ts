import connectDB from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    if (!lat || !lon) {
      return NextResponse.json(
        { error: 'lat and lon are required' },
        { status: 400 },
      );
    }
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'en',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json(res.statusText, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error', details: String(error) },
      { status: 500 },
    );
  }
}
