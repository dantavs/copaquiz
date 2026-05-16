import { NextRequest, NextResponse } from 'next/server';
import { getAlbum, updateStickers, deleteAlbum } from '@/lib/albumBackend';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const album = getAlbum(code);
  if (!album) {
    return NextResponse.json({ error: 'Album not found' }, { status: 404 });
  }
  return NextResponse.json(album);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const album = getAlbum(code);
  if (!album) {
    return NextResponse.json({ error: 'Album not found' }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { stickers } = body as Record<string, unknown>;

  if (!stickers || typeof stickers !== 'object' || Array.isArray(stickers)) {
    return NextResponse.json({ error: 'stickers must be a non-empty object' }, { status: 400 });
  }

  const updated = updateStickers(code, stickers as Record<string, number>);
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const deleted = deleteAlbum(code);
  if (!deleted) {
    return NextResponse.json({ error: 'Album not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Album deleted' });
}
