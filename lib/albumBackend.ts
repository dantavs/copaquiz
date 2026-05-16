import fs from 'fs';
import path from 'path';

export interface AlbumData {
  code: string;
  name: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  stickers: Record<string, number>;
}

const DATA_DIR = path.join(process.cwd(), 'data', 'albums');

function ensureDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function filePath(code: string): string {
  return path.join(DATA_DIR, `${code}.json`);
}

function generateCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export function generateUniqueCode(): string {
  ensureDir();
  let code: string;
  do {
    code = generateCode();
  } while (fs.existsSync(filePath(code)));
  return code;
}

export function createAlbum(name: string, owner: string): AlbumData {
  ensureDir();
  const code = generateUniqueCode();
  const now = new Date().toISOString();
  const album: AlbumData = {
    code,
    name,
    owner,
    createdAt: now,
    updatedAt: now,
    stickers: {},
  };
  fs.writeFileSync(filePath(code), JSON.stringify(album, null, 2), 'utf-8');
  return album;
}

export function listAlbums(): AlbumData[] {
  ensureDir();
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
  return files.map(f => {
    const data: AlbumData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), 'utf-8'));
    return data;
  });
}

export function getAlbum(code: string): AlbumData | null {
  const fp = filePath(code);
  if (!fs.existsSync(fp)) return null;
  return JSON.parse(fs.readFileSync(fp, 'utf-8'));
}

export function updateStickers(code: string, stickers: Record<string, number>): AlbumData | null {
  const album = getAlbum(code);
  if (!album) return null;
  for (const [id, qty] of Object.entries(stickers)) {
    album.stickers[id] = (album.stickers[id] ?? 0) + qty;
    if (album.stickers[id] <= 0) delete album.stickers[id];
  }
  album.updatedAt = new Date().toISOString();
  fs.writeFileSync(filePath(code), JSON.stringify(album, null, 2), 'utf-8');
  return album;
}

export function deleteAlbum(code: string): boolean {
  const fp = filePath(code);
  if (!fs.existsSync(fp)) return false;
  fs.unlinkSync(fp);
  return true;
}
