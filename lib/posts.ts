import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'data/posts');

export function getPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const content = fs.readFileSync(fullPath, 'utf8');
    
    // Simplistic extraction of title from first line
    const title = content.split('\n')[0].replace(/^#\s+/, '');
    
    return { slug, title, content };
  });
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const content = fs.readFileSync(fullPath, 'utf8');
  return { slug, content };
}
