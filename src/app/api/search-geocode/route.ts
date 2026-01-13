import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json({ error: 'Missing query' }, { status: 400 });
  }

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      q,
    )}&format=json`,
    {
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'en',
      },
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    return NextResponse.json({ error: 'Nominatim failed' }, { status: 500 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
