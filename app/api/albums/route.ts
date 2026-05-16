import { NextRequest, NextResponse } from 'next/server';
import { createAlbum, listAlbums } from '@/lib/albumBackend';

export async function GET() {
  try {
    const albums = await listAlbums();
    return NextResponse.json(albums);
  } catch (error) {
    console.error('listAlbums error:', error);
    return NextResponse.json({ error: 'Failed to list albums' }, { status: 500 });
  }
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

  try {
    const album = await createAlbum(name.trim(), owner.trim());
    return NextResponse.json(album, { status: 201 });
  } catch (error) {
    console.error('createAlbum error:', error);
    return NextResponse.json({ error: 'Failed to create album' }, { status: 500 });
  }
}
