import { NextRequest, NextResponse } from 'next/server';
import { createAlbum, listAlbums } from '@/lib/albumBackend';

export async function GET() {
  const albums = listAlbums();
  return NextResponse.json(albums);
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { name, owner } = body as Record<string, unknown>;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return NextResponse.json({ error: 'name is required and must be non-empty' }, { status: 400 });
  }
  if (!owner || typeof owner !== 'string' || owner.trim().length === 0) {
    return NextResponse.json({ error: 'owner is required and must be non-empty' }, { status: 400 });
  }

  const album = createAlbum(name.trim(), owner.trim());
  return NextResponse.json(album, { status: 201 });
}
