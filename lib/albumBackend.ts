import fs from 'fs';
import path from 'path';
import { Redis } from '@upstash/redis';

export interface AlbumData {
  code: string;
  name: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  stickers: Record<string, number>;
}

// Initialize Redis only if env vars are available (production)
const redisUrl = process.env.KV_REST_API_URL;
const redisToken = process.env.KV_REST_API_TOKEN;
const redis = redisUrl && redisToken
  ? new Redis({ url: redisUrl, token: redisToken })
  : null;

// File system fallback for local dev
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

async function isCodeTaken(code: string): Promise<boolean> {
  if (redis) {
    const exists = await redis.exists(`album:${code}`);
    return exists === 1;
  }
  return fs.existsSync(filePath(code));
}

function isCodeTakenSync(code: string): boolean {
  return fs.existsSync(filePath(code));
}

export async function generateUniqueCode(): Promise<string> {
  if (redis) {
    let code: string;
    do {
      code = generateCode();
    } while (await isCodeTaken(code));
    return code;
  }
  ensureDir();
  let code: string;
  do {
    code = generateCode();
  } while (isCodeTakenSync(code));
  return code;
}

export async function createAlbum(name: string, owner: string): Promise<AlbumData> {
  const code = await generateUniqueCode();
  const now = new Date().toISOString();
  const album: AlbumData = {
    code, name, owner,
    createdAt: now, updatedAt: now,
    stickers: {},
  };

  if (redis) {
    await redis.set(`album:${code}`, JSON.stringify(album));
    await redis.sadd('album:codes', code);
  } else {
    ensureDir();
    fs.writeFileSync(filePath(code), JSON.stringify(album, null, 2), 'utf-8');
  }
  return album;
}

export async function listAlbums(): Promise<AlbumData[]> {
  if (redis) {
    const codes = await redis.smembers('album:codes');
    if (codes.length === 0) return [];
    const keys = codes.map((c: string) => `album:${c}`);
    const data = await redis.mget(...keys);
    return (data as string[])
      .filter((item): item is string => item !== null)
      .map((item) => JSON.parse(item));
  }
  ensureDir();
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
  return files.map(f => {
    const data: AlbumData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), 'utf-8'));
    return data;
  });
}

export async function getAlbum(code: string): Promise<AlbumData | null> {
  if (redis) {
    const data = await redis.get(`album:${code}`);
    if (!data) return null;
    return typeof data === 'string' ? JSON.parse(data) : data as AlbumData;
  }
  const fp = filePath(code);
  if (!fs.existsSync(fp)) return null;
  return JSON.parse(fs.readFileSync(fp, 'utf-8'));
}

export async function updateStickers(code: string, stickers: Record<string, number>): Promise<AlbumData | null> {
  const album = await getAlbum(code);
  if (!album) return null;
  album.stickers = { ...stickers };
  for (const [id, qty] of Object.entries(album.stickers)) {
    if (qty <= 0) delete album.stickers[id];
  }
  album.updatedAt = new Date().toISOString();

  if (redis) {
    await redis.set(`album:${code}`, JSON.stringify(album));
  } else {
    fs.writeFileSync(filePath(code), JSON.stringify(album, null, 2), 'utf-8');
  }
  return album;
}

export async function deleteAlbum(code: string): Promise<boolean> {
  if (redis) {
    const exists = await redis.exists(`album:${code}`);
    if (exists !== 1) return false;
    await redis.del(`album:${code}`);
    await redis.srem('album:codes', code);
    return true;
  }
  const fp = filePath(code);
  if (!fs.existsSync(fp)) return false;
  fs.unlinkSync(fp);
  return true;
}
