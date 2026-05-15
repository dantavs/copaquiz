import Link from 'next/link';
import { getPosts } from '@/lib/posts';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function BlogPage() {
  const posts = getPosts();
  return (
    <>
      <Header />
      <main className="container" style={{ minHeight: '70vh', padding: '2rem 1rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center' }}>Blog CopaQuiz</h1>
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`} 
              className="glass" 
              style={{ padding: '1.5rem', borderRadius: 'var(--border-radius)', textDecoration: 'none', color: 'var(--foreground)' }}
            >
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{post.title}</h2>
              <p style={{ opacity: 0.8 }}>Clique para ler este artigo exclusivo sobre a Copa do Mundo.</p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
